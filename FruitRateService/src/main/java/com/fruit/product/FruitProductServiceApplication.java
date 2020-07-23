package com.fruit.product;


import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.fruit.product.dto.MyProperty;

@SpringBootApplication
public class FruitProductServiceApplication implements CommandLineRunner{
	static Logger logger = LoggerFactory.getLogger(FruitProductServiceApplication.class);  
	
	@Autowired
	MyProperty myProps;
	
	public static void main(String[] args) {
		SpringApplication.run(FruitProductServiceApplication.class, args);
		logger.debug("Sample debug message");  
        logger.info("Sample info message");  
        logger.warn("Sample warn message");  
        logger.error("Sample error message");
		
	}
	@Override
	public void run(String... args) throws Exception {
		logger.info("Get temp path " + myProps.getVariable());
		logger.info("Upload path: "+ myProps.getUploadPath());
		
	}

}
