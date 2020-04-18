package com.fruit.product.dto;

import java.io.Serializable;
import java.util.Map;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private int roleId;
    private int userId;
    
    public AuthenticationResponse(String jwt, int roleId, int userId) {
        this.jwt = jwt;
        this.roleId = roleId;
        this.userId = userId;
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
    
    
}
