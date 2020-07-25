package com.fruit.product.dto;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

import com.fasterxml.jackson.annotation.JsonProperty;

@Entity
@Table(name="product_details")
public class Product{
	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getImage() {
		return image;
	}

	public void setImage(String image) {
		this.image = image;
	}

	public String getDelivery() {
		return delivery;
	}

	public void setDelivery(String delivery) {
		this.delivery = delivery;
	}

 
	public float getPrice() {
		return price;
	}

	public void setPrice(float price) {
		this.price = price;
	}

	public String getWeight() {
		return weight;
	}

	public void setWeight(String weight) {
		this.weight = weight;
	}



	/*
	 * @Id
	 * 
	 * @GeneratedValue(strategy=GenerationType.AUTO) private int product_id;
	 * 
	 * 
	 * public int getProduct_id() { return product_id; }
	 * 
	 * public void setProduct_id(int product_id) { this.product_id = product_id; }
	 */

	/*
	 * public int getQty() { return qty; }
	 * 
	 * public void setQty(int qty) { this.qty = qty; }
	 */

	public int getMax_qty() {
		return max_qty;
	}

	public void setMax_qty(int max_qty) {
		this.max_qty = max_qty;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getCreatedDT() {
		return createdDT;
	}

	public void setCreatedDT(String createdDT) {
		this.createdDT = createdDT;
	}



	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int item_id;
	public int getItem_id() {
		return item_id;
	}

	public void setItem_id(int item_id) {
		this.item_id = item_id;
	}



	@NotNull
	@Column(name="name")
	private String name;
	
	@Column(name="image")
	private String image;
	
	@Column(name="delivery")
	private String delivery;
	
	@Column(name="price")
	private float price;
	
	/*
	 * @Column(name="qty") private int qty;
	 */
	@Column(name="max_qty")
	private int max_qty;
	
	@Column(name="weight")
	private String weight;

	@Column(name="category")
	private String category;
	
	@Column(name="created_dt")
	private String createdDT;
	
	@Column(name="shop_name")
	@JsonProperty("shop_name")
	private String shopName;
	public String getShopName() {
		return shopName;
	}

	public void setShopName(String shopName) {
		this.shopName = shopName;
	}


	@Override
	public String toString() {
		return "Product [item_id=" + item_id + ", name=" + name + ", image=" + image + ", delivery=" + delivery
				+ ", price=" + price + ", max_qty=" + max_qty + ", weight=" + weight + ", category=" + category
				+ ", createdDT=" + createdDT + ", shopName=" + shopName + "]";
	}
	
	
	

	
	
	
}
