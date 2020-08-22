package com.fruit.product.dto;

import java.util.List;

public class ImageListDTO extends ResponseOutDTO{
	
	private List<String> imgName;

	public List<String> getImgName() {
		return imgName;
	}

	public void setImgName(List<String> imgName) {
		this.imgName = imgName;
	}

	public ImageListDTO(String imgName) {
		super();
		this.imgName.add(imgName);
	}
	
	public ImageListDTO() {
	}

	
	
	

}
