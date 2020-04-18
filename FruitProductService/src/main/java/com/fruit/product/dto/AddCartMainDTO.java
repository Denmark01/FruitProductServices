package com.fruit.product.dto;

import java.util.List;

public class AddCartMainDTO {

	private List<AddCartDTO> AddCartList;
	
	private String userId;

	public List<AddCartDTO> getAddCartList() {
		return AddCartList;
	}

	public void setAddCartList(List<AddCartDTO> addCartList) {
		AddCartList = addCartList;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "AddCartMainDTO [AddCartList=" + AddCartList + ", userId=" + userId + "]";
	}
	
	
}
