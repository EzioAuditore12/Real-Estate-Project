package com.realestate.server.application.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.application.entities.Application;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {
    
}
