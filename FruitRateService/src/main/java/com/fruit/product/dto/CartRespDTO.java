package com.fruit.product.dto;

import java.util.List;

public class CartRespDTO extends ResponseOutDTO{
	
	private List<AddCartDTO> cart;

	public List<AddCartDTO> getCart() {
		return cart;
	}

	public void setCart(List<AddCartDTO> cart) {
		this.cart = cart;
	}
	

}
