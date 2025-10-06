package com.realestate.server.property.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.property.entities.PropertyEntity;

public interface PropertyRespository extends JpaRepository<PropertyEntity, UUID> {
    
}
