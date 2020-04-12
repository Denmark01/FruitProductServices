package com.fruit.product.config;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.fruit.product.dto.ResponseOutDTO;

public class ConfigMethods {
	
	public static ResponseEntity<ResponseOutDTO> resourseUtils(ResponseOutDTO response) {
		HttpStatus headers = HttpStatus.OK;
		if(!response.getStatus_obj().isStatus_flag()) {
			headers = HttpStatus.INTERNAL_SERVER_ERROR;
		}
		return new ResponseEntity<ResponseOutDTO>(response,new HttpHeaders(),headers);
	}

}
