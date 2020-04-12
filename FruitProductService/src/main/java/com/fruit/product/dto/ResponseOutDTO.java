package com.fruit.product.dto;


public class ResponseOutDTO {
	
	private int userId;
	private ResponseDTO status_obj;
	public int getUserId() {
		return userId;
	}
	public void setUserId(int userId) {
		this.userId = userId;
	}
	public ResponseDTO getStatus_obj() {
		return status_obj;
	}
	public void setStatus_obj(ResponseDTO status_obj) {
		this.status_obj = status_obj;
	}
	
	

}
