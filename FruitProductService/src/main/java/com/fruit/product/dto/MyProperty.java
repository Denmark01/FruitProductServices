package com.fruit.product.dto;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.stereotype.Component;

@Component
@ConfigurationProperties(prefix = "fruit.app")
//@PropertySource("classpath:application.properties")
//@PropertySource("file:/C:/Angular 4/Spring/Fruits_Startup/application.properties")
public class MyProperty {
	String variable;
	String uploadPath;
	
	Myapp myapp;
	
	public String getUploadPath() {
		return uploadPath;
	}

	public void setUploadPath(String uploadPath) {
		this.uploadPath = uploadPath;
	}

	public Myapp getMyapp() {
		return myapp;
	}

	public void setMyapp(Myapp myapp) {
		this.myapp = myapp;
	}

	public String getVariable() {
		return variable;
	}

	public void setVariable(String variable) {
		this.variable = variable;
	}
	public static class Myapp {
		String language;
		String build;
		public String getLanguage() {
			return language;
		}
		public void setLanguage(String language) {
			this.language = language;
		}
		public String getBuild() {
			return build;
		}
		public void setBuild(String build) {
			this.build = build;
		}
		
	}
}
