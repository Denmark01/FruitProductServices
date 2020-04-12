package com.fruit.product.controller;


import java.io.FileNotFoundException;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.HashMap;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.CrossOrigin;
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
import com.fruit.product.dto.AuthenticationRequest;
import com.fruit.product.dto.AuthenticationResponse;
import com.fruit.product.dto.MyProperty;
import com.fruit.product.dto.Product;
import com.fruit.product.dto.ProductRespDTO;
import com.fruit.product.dto.ResponseOutDTO;
import com.fruit.product.dto.ResponseStatusDTO;
import com.fruit.product.service.CustomUserDetailsService;
import com.fruit.product.service.ProductRegistryService;
import com.fruit.product.util.JwtUtil;

//@RequestMapping("/FruitProductService")
@RestController
public class ProductRegistryController {
	
	@Autowired
	MyProperty myProps;
	
	private static final Logger logger = LoggerFactory.getLogger(ProductRegistryController.class);
//	public static String uploadDirectory = System.getProperty("user.dir")+"/uploads";
//	public static String uploadDirectory = "C:/Angular 4/FruitWeb/FinalCodeCommit/src/assets/image";
//	public static String uploadDirectory = "C:/apache-tomcat-9.0.30-windows-x64/apache-tomcat-9.0.30/webapps/FruitUiClient/assets/image";
//	public static String uploadDirectory = "/opt/tomcat/apache-tomcat-9.0.30/webapps/ConfigServer/assets/image";
//	public static String uploadDirectory = myProps.getUploadPath();
	
	@Autowired
	private AuthenticationManager authenticationManager;

	
	@Autowired
	private JwtUtil jwtTokenUtil;

	@Autowired
    private CustomUserDetailsService userDetailsServices;

	
	@Autowired
    private ProductRegistryService productRegistryService;
	 

	@CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping(value = "/authenticate", method = RequestMethod.POST)
	public ResponseEntity createAuthenticationToken(@RequestBody AuthenticationRequest authenticationRequest) throws Exception {
		logger.info("ProductRegistryController |  createAuthenticationToken method invoked");
		try {
			authenticationManager.authenticate(
					new UsernamePasswordAuthenticationToken(authenticationRequest.getUsername(), authenticationRequest.getPassword())
			);
		}
		catch (BadCredentialsException e) {
			throw new Exception("Incorrect username or password", e);
		}
    	

		final UserDetails userDetails = userDetailsServices
				.loadUserByUsername(authenticationRequest.getUsername());

		final String jwt = jwtTokenUtil.generateToken(userDetails);
		int roleId = productRegistryService.getRole(authenticationRequest);
		return ResponseEntity.ok(new AuthenticationResponse(jwt, roleId));
	}
    
	@GetMapping("/getAll")
	public ResponseEntity<ResponseOutDTO> getAllProducts() {
    	logger.info("ProductRegistryController |  getAllProducts method invoked");
    	ResponseOutDTO response = productRegistryService.getAll();
//		return new ResponseEntity<ResponseOutDTO>(item,new HttpHeaders(),HttpStatus.OK);
		return ConfigMethods.resourseUtils(response);
	}
	
	@GetMapping("/validate-token")
	public ResponseEntity validateToken(@RequestHeader("Authorization") String token) {
		logger.info("ProductRegistryController |  validateToken method invoked");
    	logger.info("Token "+ token);
    	ResponseOutDTO response = productRegistryService.validateToken(token);
    	return ConfigMethods.resourseUtils(response);
	}
	
	@PostMapping("/save-item")
	public ResponseEntity<Product> createProduct(@RequestBody Product entity){
	Product product=new Product();
	product=productRegistryService.createProduct(entity);
	return new ResponseEntity<Product>(product,new HttpHeaders(),HttpStatus.CREATED);
	}
	
	@PostMapping("/add-to-cart")
	public ResponseEntity<ResponseOutDTO> addToCart(@RequestBody AddCartDTO entity){
		ResponseOutDTO outputData=new ResponseOutDTO();
		outputData = productRegistryService.addCartService(entity);
//	return new ResponseEntity<AddCartDTO>(cart,new HttpHeaders(),HttpStatus.CREATED);
	return ConfigMethods.resourseUtils(outputData);
	}
	
	@GetMapping("/get-cart")
	public ResponseEntity<ResponseOutDTO> getAddedCart(@RequestParam("userid")int userId) {
    	logger.info("ProductRegistryController |  getAddedCart method invoked");
    	ResponseOutDTO response = productRegistryService.getAddedCartService(userId);
//		return new ResponseEntity<ResponseOutDTO>(item,new HttpHeaders(),HttpStatus.OK);
		return ConfigMethods.resourseUtils(response);
	}
    
	@CrossOrigin(origins = "*", allowedHeaders = "*")
    @RequestMapping("/uploadItem")
    public ResponseEntity<ResponseOutDTO> uploadItem(@RequestParam("files")MultipartFile[] files, @RequestParam Map<String, String> fdata) {
    	logger.info("ProductRegistryController |  uploadItem method invoked");
    	logger.debug("Request param data "+ fdata);
    	
    	ResponseOutDTO outputData = productRegistryService.uploadService(fdata, files);
    	
    	return ConfigMethods.resourseUtils(outputData);
    }
    
    
    @CrossOrigin(origins = "*", allowedHeaders = "*")
    @PostMapping("/sign-up")
	public ResponseEntity<ResponseOutDTO> signUp(@RequestBody Map<String, String> map){
    	logger.debug("inputs "+ map);
    	ResponseOutDTO outputData = new ResponseOutDTO();
    	HttpStatus status = HttpStatus.OK;
    	String name = map.get("fistname");
    	String pass = map.get("password");
    	String email = map.get("email");
    	String last = map.get("lastname");
    	outputData = productRegistryService.signUp(email, last, name, pass);
    	return ConfigMethods.resourseUtils(outputData);
	}
}
