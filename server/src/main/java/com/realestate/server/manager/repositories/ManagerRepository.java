package com.realestate.server.manager.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.manager.entites.Manager;

public interface ManagerRepository extends JpaRepository<Manager,UUID> {
    Optional<Manager> findByEmail(String email);
}
