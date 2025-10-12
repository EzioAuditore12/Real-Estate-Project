package com.realestate.server.property.repositories;

import java.util.List;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.stereotype.Repository;

import com.realestate.server.property.entities.Property;

@Repository
public interface PropertyRespository extends JpaRepository<Property, UUID>, JpaSpecificationExecutor<Property> {
    List<Property> findAllByManagerId(UUID managerId);
}
