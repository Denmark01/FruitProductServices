package com.fruit.product.dto;
import java.util.List;



public class ProductRespDTO extends ResponseOutDTO{

	private List<Product> product_list;
	

	public List<Product> getProduct_list() {
		return product_list;
	}

	public void setProduct_list(List<Product> product_list) {
		this.product_list = product_list;
	}

	@Override
	public String toString() {
		return "ProductRespDTO [product_list=" + product_list + "]";
	}


	
	
}
