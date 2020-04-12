package com.fruit.product.dto;

import java.io.Serializable;

public class AuthenticationResponse implements Serializable {

    private final String jwt;
    private int roleId;
    public AuthenticationResponse(String jwt, int roleId) {
        this.jwt = jwt;
        this.roleId = roleId;
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
    
    
}
