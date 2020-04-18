package com.fruit.product.service;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.sql.PreparedStatement;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.http.HttpStatus;
import org.springframework.jdbc.core.BatchPreparedStatementSetter;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.product.config.QueryConstants;
import com.fruit.product.dto.AddCartDTO;
import com.fruit.product.dto.AuthenticationRequest;
import com.fruit.product.dto.CartRespDTO;
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
		List<Product> product=new ArrayList<>();
//		product	=(List<Product>) productRepository.findAll();
		outDto.setProduct_list((List<Product>)productRepository.findAll());
		outDto.setStatus_obj((new ResponseDTO("success", true)));
		logger.info("ProductRegistryService |  getAllProducts method exit");
		return outDto;
	}
	@SuppressWarnings("unchecked")
	public ResponseOutDTO getAddedCartService(int userId) {
		logger.info("ProductRegistryService |  getAddedCart method invoked");
		CartRespDTO outDto = new CartRespDTO();
		List<AddCartDTO> cart=new ArrayList<>();
		String query = QueryConstants.getAddedCartById;
		List<AddCartDTO> list = (List<AddCartDTO>) jdbcTemplate.query(query, new Object[] {userId}, (rs, rowNum) -> 
		new AddCartDTO (
				rs.getInt("cart_id"), rs.getInt("customer_id"), rs.getInt("item_id"), rs.getInt("item_qty"),
				rs.getString("category"),rs.getString("customer_name"),rs.getString("item_name"),rs.getFloat("item_price"), rs.getString("item_unit")
				));
//		product	=(List<Product>) productRepository.findAll();
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
	
	public ResponseOutDTO signUp(String email, String last, String name, String pass) {
		logger.info("ProductRegistryService |  signUp method invoked");
		
		int roleId = 2;
		ResponseStatusDTO responseDto = new ResponseStatusDTO();
		String userRecordQuery = QueryConstants.userRecordInsert;
		try {
		int userRecordInsertVal = jdbcTemplate.update(userRecordQuery,new Object[] {1, email, last, name, pass});
		logger.info("query "+ userRecordQuery);
		
		if (userRecordInsertVal > 0) {
			int userId = jdbcTemplate.queryForObject(QueryConstants.userId, new Object[] {name, pass}, Integer.class);
			String userRoleQuery = QueryConstants.userRoleInsert;
			logger.info("query "+ userRoleQuery);
			int userRoleInsertVal = jdbcTemplate.update(userRoleQuery, new Object[] {userId, roleId});
			if (userRoleInsertVal > 0) {
				responseDto.setStatus(1);
				responseDto.setMessage("User successfully updated");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
			} else {
				responseDto.setStatus(0);
				responseDto.setMessage("Error");
				responseDto.setStatus_obj(new ResponseDTO("Success", true));
			}
		} else {
			responseDto.setStatus_obj(new ResponseDTO("Failure", false));
			
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

	public  Map<String, Integer> getRole(AuthenticationRequest authenticationRequest) {
		String user = authenticationRequest.getUsername();
		String pass = authenticationRequest.getPassword();
		Map<String, Integer> map = new HashMap<>();
		int userId = jdbcTemplate.queryForObject(QueryConstants.userId, new Object[] {user}, Integer.class);
		
		int userRole = jdbcTemplate.queryForObject(QueryConstants.userRole, new Object[] {userId}, Integer.class);
		map.put("userId", userId);
		map.put("userRole", userRole);
		return map;
	}

	public ResponseOutDTO addCartService(List<AddCartDTO> addCartList) {
		logger.info("ProductRegistryService |  addCartService method invoked");
		ResponseStatusDTO outputData = new ResponseStatusDTO();
		String deleteCartByUserId = QueryConstants.deleteCartByUserId;
		
			try {
				if (addCartList.size() > 0) {
					int delCount = jdbcTemplate.queryForObject(deleteCartByUserId, new Object[] {}, Integer.class);
					logger.info("delete data count "+ delCount);
					int insert[] = batchInsert(addCartList);
					if (insert.length > 0) {
						outputData.setStatus_obj(new ResponseDTO("Success", true));
						outputData.setStatus(1);
						outputData.setMessage("Added to Cart "+ insert.length);
					} else {
						outputData.setStatus_obj(new ResponseDTO("Success", true));
						outputData.setStatus(0);
						outputData.setMessage("Zero cart added");
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
	
	public int[] batchInsert(List<AddCartDTO> addCart) {

        return this.jdbcTemplate.batchUpdate(QueryConstants.insertCart,
			new BatchPreparedStatementSetter() {
        	LocalDateTime current = LocalDateTime.now();
    		DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    		String dateAndTime = current.format(format);
    		
				public void setValues(PreparedStatement ps, int i) throws SQLException {
					ps.setInt(1, addCart.get(i).getCart_id());
					ps.setString(2, addCart.get(i).getCategory());
					ps.setInt(3, addCart.get(i).getCstmerId());
					ps.setString(4, addCart.get(i).getCstmerName());
					ps.setInt(5, addCart.get(i).getItemId());
					ps.setString(6, addCart.get(i).getItemName());
					ps.setInt(7, addCart.get(i).getItemQty());
					ps.setFloat(8, addCart.get(i).getPrice());
					ps.setString(9, addCart.get(i).getUnit());
					ps.setString(10, dateAndTime);
				}

				public int getBatchSize() {
					return addCart.size();
				}

			});
    }
	
	public ResponseOutDTO uploadService(Map<String, String> fdata, MultipartFile[] files) {
		logger.info("ProductRegistryService |  uploadService method invoked");
		StringBuilder fileNames = new StringBuilder();
		ResponseStatusDTO outputData = new ResponseStatusDTO();
		HttpStatus status = HttpStatus.OK;
		
		for(MultipartFile file: files) {
			Path fileNameAndPath = Paths.get(myProps.getUploadPath(), file.getOriginalFilename());
    		logger.info("File size in mb "+ file.getSize()/1024+" kb");
    		logger.info("File type " + file.getContentType());
    		logger.info("File type ori " + file.getResource());
        	logger.info("fileNameAndPath "+ fileNameAndPath);
    		fileNames.append(file.getOriginalFilename());
    		
    		try {
    			if (file.getContentType().equals("image/jpeg") || file.getContentType().equals("image/png")) {
    				Files.write(fileNameAndPath, file.getBytes());
    				Product product=new Product();
    				
    				LocalDateTime current = LocalDateTime.now();
    				DateTimeFormatter format = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
    				
    				product.setCreatedDT(current.format(format));   				
    				product.setName(fdata.get("itemName"));
    				product.setImage("assets/image/"+file.getOriginalFilename());
    				product.setMax_qty(Integer.valueOf(fdata.get("maxQty")));
    				product.setPrice(Float.valueOf(fdata.get("price")));
    				product.setWeight(fdata.get("unit"));
    				product.setCategory(fdata.get("category"));
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
			output.setMessage("Feedback successfully submited");
			output.setStatus_obj(new ResponseDTO("Success", true));
		} else {
			output.setStatus(1);
			output.setMessage("Something went wrong");
			output.setStatus_obj(new ResponseDTO("Failure", false));
		}
		
		return output;
	}
	
	
}
