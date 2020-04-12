package com.fruit.product.config;

public class QueryConstants {
	
	public static final String userRoleInsert = "insert into user_role (user_id, role_id) values(?, ?)";
	
	public static final String userRecordInsert = "insert into user (active, email, last_name, name, password) values(?, ?, ?, ?, ?)";
	
	public static final String userId = "select user_id from user where name = ? and password = ?";
	
	public static final String userRole = "select role_id from user_role where user_id = ?";
	
	public static final String getAddedCartById = "select * from add_cart where customer_id = ?";
}
