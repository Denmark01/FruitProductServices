package com.fruit.product.dto;

import java.io.Serializable;
import java.util.List;

public class AddCartMainDTO implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private List<AddCartDTO> addCartList;
	
	private String userId;

	public List<AddCartDTO> getAddCartList() {
		return addCartList;
	}

	public void setAddCartList(List<AddCartDTO> addCartList) {
		this.addCartList = addCartList;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	@Override
	public String toString() {
		return "AddCartMainDTO [addCartList=" + addCartList + ", userId=" + userId + "]";
	}

	
	
}
