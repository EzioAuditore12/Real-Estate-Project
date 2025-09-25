package com.realestate.server.user.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.user.entites.UserEntity;

public interface UserRepository extends JpaRepository<UserEntity,String> {
    Optional<UserEntity> findByEmail(String email);
}
