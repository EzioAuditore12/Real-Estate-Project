package com.realestate.server.property.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.property.entities.Property;

public interface PropertyRespository extends JpaRepository<Property, UUID> {
    
}
