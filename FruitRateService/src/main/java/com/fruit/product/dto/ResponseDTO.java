package com.fruit.product.dto;

public class ResponseDTO {
	
	private String status_msg;
	private boolean status_flag;
		
	public String getStatus_msg() {
		return status_msg;
	}
	public void setStatus_msg(String status_msg) {
		this.status_msg = status_msg;
	}
	public boolean isStatus_flag() {
		return status_flag;
	}
	public void setStatus_flag(boolean status_flag) {
		this.status_flag = status_flag;
	}
	public ResponseDTO(String status_msg, boolean status_flag) {
		super();
		this.status_msg = status_msg;
		this.status_flag = status_flag;
	}
	public ResponseDTO() {
		super();
	}
	
}
