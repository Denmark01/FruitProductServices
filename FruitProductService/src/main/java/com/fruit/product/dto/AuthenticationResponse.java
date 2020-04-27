package com.fruit.product.dto;

import java.io.Serializable;
import java.util.Map;

public class AuthenticationResponse extends ResponseOutDTO implements Serializable  {

    private final String jwt;
    private int roleId;
    private int userId;
    private String user;
    
    public AuthenticationResponse(String jwt, int roleId, int userId, String user) {
        this.jwt = jwt;
        this.roleId = roleId;
        this.userId = userId;
        this.user = user;
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
    
    
}
