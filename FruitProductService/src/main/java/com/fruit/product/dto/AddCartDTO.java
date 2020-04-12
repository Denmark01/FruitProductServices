package com.fruit.product.dto;

import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="add_cart")
public class AddCartDTO {
	
	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int cart_id;
	
	@NotNull
	@Column(name="item_id")
	private int itemId;
	
	@Column(name="customer_id")
	private int cstmerId;
	
	@Column(name="customer_name")
	private String cstmerName;
	
	@Column(name="item_name")
	private String itemName;
	
	@Column(name="item_price")
	private float price;

	@Column(name="item_qty")
	private int itemQty;
	
	@Column(name="item_unit")
	private String unit;

	@Column(name="category")
	private String category;
	
	@Column(name="cart_time")
	private String cartTime;

	public int getCart_id() {
		return cart_id;
	}

	public void setCart_id(int cart_id) {
		this.cart_id = cart_id;
	}

	public int getItemId() {
		return itemId;
	}

	public void setItemId(int itemId) {
		this.itemId = itemId;
	}

	public int getCstmerId() {
		return cstmerId;
	}

	public void setCstmerId(int cstmerId) {
		this.cstmerId = cstmerId;
	}

	public String getCstmerName() {
		return cstmerName;
	}

	public void setCstmerName(String cstmerName) {
		this.cstmerName = cstmerName;
	}

	public String getItemName() {
		return itemName;
	}

	public void setItemName(String itemName) {
		this.itemName = itemName;
	}

	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	
	public int getItemQty() {
		return itemQty;
	}

	public void setItemQty(int itemQty) {
		this.itemQty = itemQty;
	}

	public String getCartTime() {
		return cartTime;
	}

	public void setCartTime(String cartTime) {
		this.cartTime = cartTime;
	}

	@Override
	public String toString() {
		return "AddCartDTO [cart_id=" + cart_id + ", itemId=" + itemId + ", cstmerId=" + cstmerId + ", cstmerName="
				+ cstmerName + ", itemName=" + itemName + ", price=" + price + ", itemQty=" + itemQty + ", unit=" + unit
				+ ", category=" + category + "]";
	}

	public AddCartDTO(int cart_id, int cstmerId, @NotNull int itemId, int itemQty, String category, String cstmerName,
			String itemName, float price, String unit) {
		super();
		this.cart_id = cart_id;
		this.cstmerId = cstmerId;
		this.itemId = itemId;
		this.itemQty = itemQty;
		this.category = category;
		this.cstmerName = cstmerName;
		this.itemName = itemName;
		this.price = price;
		this.unit = unit;
	}
	public AddCartDTO() {}
	
	
	
	
}
