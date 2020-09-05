package com.fruit.product.config;

public class QueryConstants {
	
	public static final String userRoleInsert = "insert into user_role (user_id, role_id) values(?, ?)";
	
	public static final String userRecordInsert = "insert into user (active, email, name, password, mob_no, gender, shop_name) values(?, ?, ?, ?, ?, ?, ?)";
	
	public static final String userId = "select user_id from user where name = ?";
	
	public static final String imagePath = "select image from product_details";
	
	public static final String userCheckExist = "select count(*) from user where name = ?";
	
	public static final String userName = "select name from user where user_id = ?";
	
	public static final String shopName = "select shop_name from user where user_id = ?";
	
	public static final String userRole = "select role_id from user_role where user_id = ?";
	
	public static final String getAddedCartById = "select * from add_cart where customer_id = ?";
	
	public static final String deleteCartByUserId  = "delete from add_cart where customer_id = ?";
	
	public static final String deleteByItemId = "delete from product_details where item_id = ?";
	
	public static final String editPriceItem = "update product_details set name = ?, max_qty = ?, weight = ?, price = ?, delivery = ?, stock = ? where item_id = ?";
	
	public static final String insertCart = "insert into add_cart (category, customer_id, customer_name, item_id, item_name, item_qty, item_price, item_unit, cart_time, max_qty) values(?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
	
	public static final String getMobno = "select mob_no from user where name = ?";
}
