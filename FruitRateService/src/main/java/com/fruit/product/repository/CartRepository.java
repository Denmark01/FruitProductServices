package com.fruit.product.repository;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;
import com.fruit.product.dto.AddCartDTO;

@Repository
public interface CartRepository extends CrudRepository<AddCartDTO, Long> {

}
