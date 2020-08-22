package com.fruit.product.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.product.config.QueryConstants;
import com.fruit.product.dto.AddCartDTO;
import com.fruit.product.dto.CartRespDTO;
import com.fruit.product.dto.ImageListDTO;
import com.fruit.product.dto.MyProperty;
import com.fruit.product.dto.Product;
import com.fruit.product.dto.ProductRespDTO;
import com.fruit.product.dto.ResponseDTO;
import com.fruit.product.dto.ResponseOutDTO;
import com.fruit.product.dto.ResponseStatusDTO;
import com.fruit.product.dto.ValidateTokenDTO;
import com.fruit.product.model.Feedback;
import com.fruit.product.repository.CartRepository;
import com.fruit.product.repository.FeedbackRepository;
import com.fruit.product.repository.ProductRepository;
import com.fruit.product.util.JwtUtil;



@Service
public class ProductRegistryService {

	private static final Logger logger = LoggerFactory.getLogger(ProductRegistryService.class);
	
	@Autowired
	JdbcTemplate jdbcTemplate;
	@Autowired
	 ProductRepository productRepository;
	@Autowired
	CartRepository cartRepository;
	@Autowired
	JwtUtil jwt;
	@Autowired
	MyProperty myProps;
	@Autowired
	FeedbackRepository feedbackRepository;
	
	public ResponseOutDTO getAll() {
		ProductRespDTO outDto = new ProductRespDTO();
		outDto.setProduct_list((List<Product>)productRepository.findAll());
		outDto.setStatus_obj((new ResponseDTO("success", true)));
		logger.info("ProductRegistryService |  getAllProducts method exit");
		return outDto;
	}
	
	public ResponseOutDTO getAddedCartService(int userId) {
		logger.info("ProductRegistryService |  getAddedCart method invoked");
		CartRespDTO outDto = new CartRespDTO();
		String query = QueryConstants.getAddedCartById;
		List<AddCartDTO> list = (List<AddCartDTO>) jdbcTemplate.query(query, new Object[] {userId}, (rs, rowNum) -> 
		new AddCartDTO (
				rs.getInt("cart_id"), rs.getInt("customer_id"), rs.getInt("item_id"), rs.getInt("item_qty"),
				rs.getString("category"),rs.getString("customer_name"),rs.getString("item_name"),
				rs.getFloat("item_price"), rs.getString("item_unit"), rs.getInt("max_qty")
				));
		outDto.setCart(list);
		outDto.setStatus_obj((new ResponseDTO("success", true)));
		logger.info("ProductRegistryService |  getAddedCart method exit");
		return outDto;
	}
	
	public ResponseOutDTO validateToken(String token) {
		logger.info("ProductRegistryService |  validateToken method invoked");
		
		ValidateTokenDTO responseDTO = new ValidateTokenDTO();
		String tokenSubString = token.replace("Bearer ", "");
		responseDTO.setTokenExp(jwt.isTokenExpired(tokenSubString));
		responseDTO.setStatus_obj((new ResponseDTO("success", true)));
		logger.info("ProductRegistryController |  validateToken method exit");
		return responseDTO;
	}
	
	public Product createProduct(Product entity) {
		logger.info("ProductRegistryService |  createProduct method invoked");
		Product product=new Product();
		product=productRepository.save(entity);
		logger.info("ProductRegistryService |  createProduct method exit");
		return product;
	}
	
	public ResponseOutDTO signUp(String email, String mobno, String name, String pass, String gender, String shopName) {
		logger.info("ProductRegistryService |  signUp method invoked");
		int roleId = 0;
		if (shopName != null) {
			 roleId = 3;
		} else {
			 roleId = 2;
		}
		logger.info("Role Id:  "+ roleId);
		ResponseStatusDTO responseDto = new ResponseStatusDTO();
		String userRecordQuery = QueryConstants.userRecordInsert;
		try {
			logger.debug("user Exist query:: "+ QueryConstants.userCheckExist);
			int userExist = jdbcTemplate.queryForObject(QueryConstants.userCheckExist, new Object[] {name}, Integer.class);			
			logger.info("is User Exist:: "+ userExist);
			if (userExist > 0) {
				responseDto.setStatus(0);
				responseDto.setMessage("User name is already Exists");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
				return responseDto;
			}
			
			
			logger.debug("userRecordInsertVal query:: "+ userRecordQuery);
			int userRecordInsertVal = jdbcTemplate.update(userRecordQuery,new Object[] {1, email, name, pass, mobno, gender, shopName});			
			logger.info("User Record inserted Value:: "+ userRecordInsertVal);
			
			if (userRecordInsertVal == 0) {
				responseDto.setStatus(0);
				responseDto.setMessage("Something went wrong.. Please try again");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
				return responseDto;
			}
			
			logger.debug("userId query:: "+ QueryConstants.userId);
			int userId = jdbcTemplate.queryForObject(QueryConstants.userId, new Object[] {name}, Integer.class);
			String userRoleQuery = QueryConstants.userRoleInsert;
			logger.info("User Id:: "+ userId);
			
			if (userId == 0) {
				responseDto.setStatus(0);
				responseDto.setMessage("Something went wrong.. Please try again");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
				return responseDto;
			}
			
			int userRoleInsertVal = jdbcTemplate.update(userRoleQuery, new Object[] {userId, roleId});
			if (userRoleInsertVal > 0) {
				responseDto.setStatus(1);
				responseDto.setMessage("User successfully updated. Please Login");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
			} else {
				responseDto.setStatus(0);
				responseDto.setMessage("Something went wrong.. Please try again");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
			} 
		} catch(DataAccessException e) {
			responseDto.setStatus_obj(new ResponseDTO("Failure", false));
			logger.info("ProductRegistryService |  signUp | DataAccessException ", e);
			
		} catch(Exception e) {
			responseDto.setStatus_obj(new ResponseDTO("Failure", false));
			logger.info("ProductRegistryService |  signUp | Exception ", e);
		} finally {
			logger.info("ProductRegistryService |  signUp method exit");
		}
		
		return responseDto;
	}

	public  Map<String, Integer> getRole(String user) {
		Map<String, Integer> map = new HashMap<>();
		int userId = 0, userRole =0;
		try {
		 userId = jdbcTemplate.queryForObject(QueryConstants.userId, new Object[] {user}, Integer.class);
		
		 userRole = jdbcTemplate.queryForObject(QueryConstants.userRole, new Object[] {userId}, Integer.class);
		}catch(EmptyResultDataAccessException e) {
			
			logger.info("ProductRegistryService |  getRole | DataAccessException ", e);
		} catch(Exception e) {
			
			logger.info("ProductRegistryService |  getRole | Exception ", e);
		} finally {
			logger.info("ProductRegistryService |  getRole method exit");
		}
		map.put("userId", userId);
		map.put("userRole", userRole);
		return map;
	}
	
	public Map<String , String> getShopName(int userId) {
		Map<String, String> map = new HashMap<>();
		
		String shopName = null;
		try {
		
		 shopName = jdbcTemplate.queryForObject(QueryConstants.shopName, new Object[] {userId}, String.class);
		}catch(EmptyResultDataAccessException e) {
			
			logger.info("ProductRegistryService |  getShopName | DataAccessException ", e);
		} catch(Exception e) {
			
			logger.info("ProductRegistryService |  getShopName | Exception ", e);
		} finally {
			logger.info("ProductRegistryService |  getShopName method exit");
		}
		map.put("shop_name", shopName);
		return map;
	}

	public ResponseOutDTO addCartService(List<AddCartDTO> addCartList, String username) {
		logger.info("ProductRegistryService |  addCartService method invoked");
		ResponseStatusDTO outputData = new ResponseStatusDTO();
		String deleteCartByUserId = QueryConstants.deleteCartByUserId;
			try {
				if (addCartList.size() >= 0) {
					logger.info("query:: userId::  "+ QueryConstants.userId);
					int userId = jdbcTemplate.queryForObject(QueryConstants.userId, new Object[] {username}, Integer.class);
					logger.info("Customer id "+ userId);
					logger.info("query:: deleteCartByUserId::  "+ deleteCartByUserId);
					int delCount = jdbcTemplate.update(deleteCartByUserId, userId);
					logger.info("delete data count "+ delCount);
					if (addCartList.size() != 0) {
					int insert[] = batchInsert(addCartList,userId, username);
					if (insert.length > 0) {
						outputData.setStatus_obj(new ResponseDTO("Success", true));
						outputData.setStatus(1);
						outputData.setMessage("Item added to cart: "+ insert.length);
					}
					
					} else {
						outputData.setStatus_obj(new ResponseDTO("Success", true));
						outputData.setStatus(1);
						outputData.setMessage("Cart is Empty ");
					}
				} else {
					outputData.setStatus_obj(new ResponseDTO("Success", true));
					outputData.setStatus(0);
					outputData.setMessage("No list to add");
				}
				
			} catch(EmptyResultDataAccessException e) {
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  addCartService | DataAccessException ", e);
			} catch(Exception e) {
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  addCartService | Exception ", e);
			} finally {
				logger.info("ProductRegistryService |  addCartService method exit");
			}
			
		return outputData;
	}
	
	public int[] batchInsert(List<AddCartDTO> addCart, int customerId, String customerName) {
		LocalDateTime current = LocalDateTime.now();
		DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
		String dateAndTime = current.format(format);
        return this.jdbcTemplate.batchUpdate(QueryConstants.insertCart,
			new BatchPreparedStatementSetter() {
        	
				public void setValues(PreparedStatement ps, int i) throws SQLException {
					ps.setString(1, addCart.get(i).getCategory());
					ps.setInt(2, customerId);
					ps.setString(3, customerName);
					ps.setInt(4, addCart.get(i).getItemId());
					ps.setString(5, addCart.get(i).getItemName());
					ps.setInt(6, addCart.get(i).getItemQty());
					ps.setFloat(7, addCart.get(i).getPrice());
					ps.setString(8, addCart.get(i).getUnit());
					ps.setString(9, dateAndTime);
					ps.setInt(10, addCart.get(i).getMaxQty());
				}

				public int getBatchSize() {
					return addCart.size();
				}

			});
    }

	public ResponseOutDTO uploadImageService(MultipartFile[] files) {
		logger.info("ProductRegistryService |  uploadImageService method invoked");
		ResponseStatusDTO outputData = new ResponseStatusDTO();
		
		for(MultipartFile file: files) {
			String fname = file.getOriginalFilename();
			fname = fname.substring(0,1).toUpperCase()+fname.substring(1).toLowerCase();
			Path fileNameAndPath = Paths.get(myProps.getUploadPath(), fname);
    		logger.info("File size in mb "+ file.getSize()/1024+" kb");
    		logger.info("File type " + file.getContentType());
    		logger.info("File type ori " + file.getResource());
    		logger.info("fileNameAndPath & Renamed Name "+ fileNameAndPath+" "+fname);
    		
    		try {
    			if (file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png")) {
    				Files.write(fileNameAndPath, file.getBytes());
    			} else {
    				outputData.setStatus(0);
    				outputData.setMessage("type not matched");
    			}
    			outputData.setStatus_obj(new ResponseDTO("Success", true));
    			
			}  catch(FileNotFoundException e) {
				logger.error("ProductRegistryController | upload ", e);
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  uploadImageService | FileNotFoundException",e);
			} catch (IOException e) {
				logger.error("ProductRegistryController | upload ", e);
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  uploadImageService | IOException",e);
			} finally {
				logger.info("ProductRegistryService |  uploadImageService method invoked");
			}
    	}
		
		return outputData;
	}
	
	public ResponseOutDTO uploadService(Map<String, String> fdata, MultipartFile[] files) {
		logger.info("ProductRegistryService |  uploadService method invoked");
		ResponseStatusDTO outputData = new ResponseStatusDTO();
		String flag = fdata.get("isUpload");
		if ("Y".equals(flag)) {
		for(MultipartFile file: files) {
			String fname = file.getOriginalFilename();
			fname = fname.substring(0,1).toUpperCase()+fname.substring(1).toLowerCase();
			Path fileNameAndPath = Paths.get(myProps.getUploadPath(), fname);
    		logger.info("File size in mb "+ file.getSize()/1024+" kb");
    		logger.info("File type " + file.getContentType());
    		logger.info("File type ori " + file.getResource());
        	logger.info("fileNameAndPath & Renamed Name "+ fileNameAndPath+" "+fname);
    		
    		try {
    			if (file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png")) {
    				Files.write(fileNameAndPath, file.getBytes());
    				Product product=new Product();
    				
    				LocalDateTime current = LocalDateTime.now();
    				DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    				
    				product.setCreatedDT(current.format(format));   				
    				product.setName(fdata.get("itemName"));
    				product.setImage("/images/"+fname);
    				product.setMax_qty(Integer.valueOf(fdata.get("maxQty")));
    				product.setPrice(Float.valueOf(fdata.get("price")));
    				product.setWeight(fdata.get("unit"));
    				product.setCategory(fdata.get("category"));
    				product.setShopName(fdata.get("shopname"));
    				product.setUsername(fdata.get("username"));
    				product.setDelivery("NA");
    				product.setStock("N");
    				product.setSubCategory(fdata.get("subCategory"));
    				product=createProduct(product);
    				
    				outputData.setStatus(1);
    				outputData.setMessage("File uploaded");
    			} else {
    				outputData.setStatus(0);
    				outputData.setMessage("type not matched");
    			}
    			outputData.setStatus_obj(new ResponseDTO("Success", true));
    			
			}  catch(FileNotFoundException e) {
				logger.error("ProductRegistryController | upload ", e);
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  uploadService | FileNotFoundException",e);
			} catch (IOException e) {
				logger.error("ProductRegistryController | upload ", e);
				outputData.setStatus_obj(new ResponseDTO("Failure", false));
				logger.info("ProductRegistryService |  uploadService | IOException",e);
			} finally {
				logger.info("ProductRegistryService |  uploadService method invoked");
			}
    	}
		} else {
			LocalDateTime current = LocalDateTime.now();
			DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
			Product product=new Product();
			product.setCreatedDT(current.format(format));   				
			product.setName(fdata.get("itemName"));
			product.setImage("/images/"+fdata.get("selectImage"));
			product.setMax_qty(Integer.valueOf(fdata.get("maxQty")));
			product.setPrice(Float.valueOf(fdata.get("price")));
			product.setWeight(fdata.get("unit"));
			product.setCategory(fdata.get("category"));
			product.setShopName(fdata.get("shopname"));
			product.setUsername(fdata.get("username"));
			product.setDelivery("NA");
			product.setStock("N");
			product=createProduct(product);
			
			outputData.setStatus(1);
			outputData.setMessage("Item added successfully");
			outputData.setStatus_obj(new ResponseDTO("Success", true));
		}
		
		return outputData;
	}
	
	public ResponseOutDTO submitFeedack(Feedback feedback) {
		logger.info("ProductRegistryService |  submitFeedack method invoked");
		ResponseStatusDTO output = new ResponseStatusDTO();
		Feedback feed=new Feedback();
		feed=feedbackRepository.save(feedback);
		logger.info("ProductRegistryService |  submitFeedack method exit");
		if(feed != null) {
			output.setStatus(1);
			output.setMessage("Thanks for the feedback");
			output.setStatus_obj(new ResponseDTO("Success", true));
		} else {
			output.setStatus(0);
			output.setMessage("Opps something went wrong. Please try again later..");
			output.setStatus_obj(new ResponseDTO("Failure", false));
		}
		
		return output;
	}
	
	public String filterName(String s) {
		if(s.toLowerCase().contains("img")) {
			return null;
		}
		String temp = s.substring(s.lastIndexOf("/")+1);
		return temp;
		
	}
	
	public ResponseOutDTO getImageService() {
		logger.info("ProductRegistryService |  getImageService method invoked");
		ImageListDTO output = new ImageListDTO();
		logger.info("query:: userId::  "+ QueryConstants.imagePath);
		List<String> list = new ArrayList<>();
		jdbcTemplate.query(QueryConstants.imagePath, new Object[] {}, (rs, rowNum) -> list.add(filterName(rs.getString("image"))));
		list.removeAll(Collections.singleton(null));
		if(list.size() > 0) {
			output.setImgName(list);
			output.setStatus_obj(new ResponseDTO("Success", true));
		} else {
			
			output.setStatus_obj(new ResponseDTO("Failure", false));
		}
		
		return output;
	}

	public ResponseOutDTO deleteItemService(int itemId) {
		logger.info("ProductRegistryService |  deleteItemService method invoked");
		ResponseStatusDTO output = new ResponseStatusDTO();
		String deleteByItemId = QueryConstants.deleteByItemId;
		logger.info("query:: deleteByItemId::  " + deleteByItemId);
		try {
			int delCount = jdbcTemplate.update(deleteByItemId, itemId);
			logger.info("Delete Count "+delCount);
			if (delCount > 0) {
				output.setStatus(1);
				output.setMessage("Product Item Deleted " + delCount);
				output.setStatus_obj(new ResponseDTO("Success", true));
			} else {
				output.setStatus(0);
				output.setMessage("Product Item not deleted " + delCount);
			}
		} catch(EmptyResultDataAccessException e) {
			output.setStatus_obj(new ResponseDTO("Failure", false));
			logger.error("ProductRegistryService |  deleteItemService | DataAccessException ", e);
		} catch (Exception e) {
			output.setStatus_obj(new ResponseDTO("Failure", false));
			logger.error("ProductRegistryService |  deleteItemService | Exception ", e);
		} finally {
			logger.info("ProductRegistryService |  deleteItemService method exit");
		}
		return output;
	}
	
	public ResponseOutDTO updateItemService(String name, int itemId, float price, int maxQty, String delivery, String weight, String stock) {
		logger.info("ProductRegistryService |  updateItemService method invoked");
		ResponseStatusDTO output = new ResponseStatusDTO();
		String updateItem = QueryConstants.editPriceItem;
		logger.debug("query:: udpateItemId::  " + updateItem);
		try {
			int updateCount = jdbcTemplate.update(updateItem, name, maxQty, weight, price, delivery, stock , itemId);
			logger.info("Update Count "+updateCount);
			if (updateCount > 0) {
				output.setStatus(1);
				output.setMessage("Product Item Updated " + updateCount);
				output.setStatus_obj(new ResponseDTO("Success", true));
			} else {
				output.setStatus(0);
				output.setMessage("Product Item not updated " + updateCount);
			}
		} catch(EmptyResultDataAccessException e) {
			output.setStatus_obj(new ResponseDTO("Failure", false));
			logger.error("ProductRegistryService |  updateItemService | DataAccessException ", e);
		} catch (Exception e) {
			output.setStatus_obj(new ResponseDTO("Failure", false));
			logger.error("ProductRegistryService |  updateItemService | Exception ", e);
		} finally {
			logger.info("ProductRegistryService |  updateItemService method exit");
		}
		return output;
	}

}
