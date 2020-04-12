package com.fruit.product.model;

import javax.persistence.Entity;
import javax.persistence.Table;

@Entity
@Table(name="item_checkout")
public class Checkout {
	
	private int sno;
	private int customerId;
	private int customerName;
	private int itemQty;
	
}
