package com.fruit.product.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fruit.product.dto.Product;
import com.fruit.product.model.Feedback;
@Repository
public interface FeedbackRepository extends CrudRepository<Feedback, Long> {

}
