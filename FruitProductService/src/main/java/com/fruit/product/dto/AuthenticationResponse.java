package com.fruit.product.dto;

import java.io.Serializable;

public class AuthenticationResponse extends ResponseOutDTO implements Serializable  {

    /**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private final String jwt;
    private int roleId;
    private int userId;
    private String user;
    private String shopName;
    
    public AuthenticationResponse(String jwt, int roleId, int userId, String user, String shopName) {
        this.jwt = jwt;
        this.roleId = roleId;
        this.userId = userId;
        this.user = user;
        this.shopName = shopName;
    }
    

	public String getJwt() {
        return jwt;
    }

	public int getRoleId() {
		return roleId;
	}

	public void setRoleId(int roleId) {
		this.roleId = roleId;
	}

	public int getUserId() {
		return userId;
	}

	public void setUserId(int userId) {
		this.userId = userId;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}


	public String getShopName() {
		return shopName;
	}


	public void setShopName(String shopName) {
		this.shopName = shopName;
	}
    
    
}
