package com.fruit.product.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.validation.constraints.NotNull;

@Entity
@Table(name="feedback")
public class Feedback{
	

	@Id
	@GeneratedValue(strategy=GenerationType.AUTO)
	private int feedbackId;
	
	@Column(name="name")
	private String name;
	
	@Column(name="comments")
	private String comments;

	public int getFeedbackId() {
		return feedbackId;
	}

	public void setFeedbackId(int feedbackId) {
		this.feedbackId = feedbackId;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	@Override
	public String toString() {
		return "feedback [feedbackId=" + feedbackId + ", name=" + name + ", comments=" + comments + "]";
	}
	
	
	
}
