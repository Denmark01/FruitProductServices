package com.fruit.product.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.fruit.product.dto.Product;
@Repository
public interface ProductRepository extends CrudRepository<Product, Long> {

}
