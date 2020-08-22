package com.fruit.product.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.fruit.product.model.Users;

import java.util.Optional;

public interface UsersRepository extends JpaRepository<Users, Integer> {
	
    Optional<Users> findByName(String username);
 
}
