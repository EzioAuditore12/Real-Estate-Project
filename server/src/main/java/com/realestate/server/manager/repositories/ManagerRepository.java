package com.realestate.server.manager.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.manager.entites.ManagerEntity;

public interface ManagerRepository extends JpaRepository<ManagerEntity,UUID> {
    Optional<ManagerEntity> findByEmail(String email);
}
