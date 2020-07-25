package com.fruit.product.controller;


import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.fruit.product.config.ConfigMethods;
import com.fruit.product.dto.AddCartDTO;
import com.fruit.product.dto.AddCartMainDTO;
import com.fruit.product.dto.AuthenticationRequest;
import com.fruit.product.dto.AuthenticationResponse;
import com.fruit.product.dto.MyProperty;
import com.fruit.product.dto.ResponseDTO;
import com.fruit.product.dto.ResponseOutDTO;
import com.fruit.product.model.Feedback;
import com.fruit.product.service.CustomUserDetailsService;
import com.fruit.product.service.ProductRegistryService;
import com.fruit.product.util.JwtUtil;

@RestController
public class ProductRegistryController {
	
	@Autowired
	MyProperty myProps;
	
	private static final Logger logger = LoggerFactory.getLogger(ProductRegistryController.class);
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
    private CustomUserDetailsService userDetailsServices;

	
	@Autowired
    private ProductRegistryService productRegistryService;
	 

	
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity<ResponseOutDTO> createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		logger.info("ProductRegistryController |  createAuthenticationToken method invoked");
		logger.debug("data :: "+ authenticationRequest);
		ResponseOutDTO output = new ResponseOutDTO();
		output.setStatus_obj(new ResponseDTO("Success", true));
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		}
		catch (BadCredentialsException e) {
			output.setStatus_obj(new ResponseDTO("Bad Request", false));
			logger.error("ProductRegistryController |  createAuthenticationToken | Bad Credential ", e);
			
		} catch (Exception e) {
			logger.error("ProductRegistryController |  createAuthenticationToken | Exception ", e);
			output.setStatus_obj(new ResponseDTO("Excep", false));
		}
    	

		final UserDetails userDetails = userDetailsServices
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		Map<String, Integer> user = productRegistryService.getRole(authenticationRequest.getUsername());
		AuthenticationResponse response = new AuthenticationResponse(jwt, user.get("userRole"),user.get("userId"),  authenticationRequest.getUsername());
		response.setStatus_obj(new ResponseDTO(output.getStatus_obj().getStatus_msg(), output.getStatus_obj().isStatus_flag()));
		return ConfigMethods.resourseUtils(response);
	}
    
    
	  @RequestMapping(value = "/getAll", method = RequestMethod.GET)
	public ResponseEntity<ResponseOutDTO> getAllProducts() {
    	logger.info("ProductRegistryController |  getAllProducts method invoked");
    	ResponseOutDTO response = productRegistryService.getAll();
		return ConfigMethods.resourseUtils(response);
	}
	
	
	@GetMapping("/validate-token")
	public ResponseEntity validateToken(@RequestHeader("Authorization") String token) {
		logger.info("ProductRegistryController |  validateToken method invoked");
    	logger.info("Token "+ token);
    	ResponseOutDTO response = productRegistryService.validateToken(token);
    	return ConfigMethods.resourseUtils(response);
	}
	
	@PostMapping("/add-to-cart")
	public ResponseEntity<ResponseOutDTO> addToCart(@RequestBody AddCartMainDTO entity){
		logger.info("ProductRegistryController |  createProduct method invoked");
		logger.debug("data :: "+ entity);
		List<AddCartDTO> addCartList = entity.getAddCartList();
		String username = entity.getUserId();
		ResponseOutDTO outputData=new ResponseOutDTO();
		outputData = productRegistryService.addCartService(addCartList, username);
	return ConfigMethods.resourseUtils(outputData);
	}
	
	
	@GetMapping("/get-cart")
	public ResponseEntity<ResponseOutDTO> getAddedCart(@RequestParam("userid")int userId) {
    	logger.info("ProductRegistryController |  getAddedCart method invoked");
    	logger.debug("data :: "+ userId);
    	ResponseOutDTO response = productRegistryService.getAddedCartService(userId);
		return ConfigMethods.resourseUtils(response);
	}
    
	
    @RequestMapping("/uploadItem")
    public ResponseEntity<ResponseOutDTO> uploadItem(@RequestParam("files")MultipartFile[] files, @RequestParam Map<String, String> fdata) {
    	logger.info("ProductRegistryController |  uploadItem method invoked");
    	logger.debug("Request param data "+ fdata);
    	
    	ResponseOutDTO outputData = productRegistryService.uploadService(fdata, files);
    	
    	return ConfigMethods.resourseUtils(outputData);
    }

	@RequestMapping("/uploadImage")
    public ResponseEntity<ResponseOutDTO> uploadImage(@RequestParam("files")MultipartFile[] files, @RequestParam Map<String, String> fdata) {
    	logger.info("ProductRegistryController |  uploadImage method invoked");
    	logger.debug("Request param data "+ fdata);
    	
    	ResponseOutDTO outputData = productRegistryService.uploadImageService(files);
    	
    	return ConfigMethods.resourseUtils(outputData);
    }
    
    
    
    @PostMapping("/sign-up")
	public ResponseEntity<ResponseOutDTO> signUp(@RequestBody Map<String, String> map){
    	logger.info("ProductRegistryController |  signUp method invoked");
    	logger.debug("inputs "+ map);
    	ResponseOutDTO outputData = new ResponseOutDTO();
    	HttpStatus status = HttpStatus.OK;
    	String name = map.get("name");
    	String pass = map.get("pass");
    	String email = map.get("email");
    	String mobno = map.get("mob_no");
    	String gender = map.get("gender");
    	String shopName = map.get("shop_name");
    	outputData = productRegistryService.signUp(email, mobno, name, pass, gender, shopName);
    	return ConfigMethods.resourseUtils(outputData);
	}
    
    @PostMapping("/feedback")
	public ResponseEntity<ResponseOutDTO> feedback(@RequestBody Feedback feedback){
		logger.info("ProductRegistryController |  feedback method invoked");
		logger.debug("data :: "+ feedback);
		ResponseOutDTO out = new ResponseOutDTO();
		out = productRegistryService.submitFeedack(feedback);
		return ConfigMethods.resourseUtils(out);
	}
    
    @GetMapping("/get-profile")
	public ResponseEntity<ResponseOutDTO> getProfile(@RequestParam("username")String username){
		logger.info("ProductRegistryController |  getProfile method invoked");
		logger.debug("data "+ username);
		Map<String, Integer> user = productRegistryService.getRole(username);
		AuthenticationResponse response = new AuthenticationResponse("NA", user.get("userRole"),user.get("userId"), username);
		response.setStatus_obj(new ResponseDTO("Success", true));
		return ConfigMethods.resourseUtils(response);
	}
    
    
    @GetMapping("/delete-item")
	public ResponseEntity<ResponseOutDTO> deleteItem(@RequestParam("item_id")int itemId){
		logger.info("ProductRegistryController |  deleteItem method invoked");
		logger.debug("Item Id "+ itemId);
		ResponseOutDTO out = new ResponseOutDTO();
		out = productRegistryService.deleteItemService(itemId);
		return ConfigMethods.resourseUtils(out);
	}
    
    
    @PostMapping("/update-item")
	public ResponseEntity<ResponseOutDTO> updateItem(@RequestBody Map<String, String> map){
		logger.info("ProductRegistryController |  updateItem method invoked");
		logger.debug("data:: "+ map);
		ResponseOutDTO out = new ResponseOutDTO();
		int itemId = Integer.valueOf(map.get("item_id"));
		int maxQty =  Integer.valueOf(map.get("max_qty"));
		float price =  Float.valueOf(map.get("price"));
		String delivery = map.get("delivery");
		String weight = map.get("weight");
		String name = map.get("name");
		out = productRegistryService.updateItemService(name, itemId, price, maxQty, delivery, weight);
		return ConfigMethods.resourseUtils(out);
	}
    
    
    @GetMapping("/temp")
	public String temp(){
    	ResponseOutDTO out = new ResponseOutDTO();
		logger.info("ProductRegistryController |  t method invoked");
		return "success";
	}
    
}
