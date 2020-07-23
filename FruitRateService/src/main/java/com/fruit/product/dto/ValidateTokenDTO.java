package com.fruit.product.dto;

public class ValidateTokenDTO extends ResponseOutDTO{
	
	private boolean isTokenExp;
	public boolean isTokenExp() {
		return isTokenExp;
	}

	public void setTokenExp(boolean isTokenExp) {
		this.isTokenExp = isTokenExp;
	}

	@Override
	public String toString() {
		return "ValidateTokenDTO [isTokenExp=" + isTokenExp + "]";
	}
	
	
}
