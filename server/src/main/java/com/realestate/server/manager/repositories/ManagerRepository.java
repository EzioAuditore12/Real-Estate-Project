package com.realestate.server.manager.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.manager.entites.Manager;
import com.realestate.server.property.entities.Property;
import java.util.Set;


public interface ManagerRepository extends JpaRepository<Manager,UUID> {
    Optional<Manager> findByEmail(String email);

    @EntityGraph(attributePaths = "managedProperties")
    Optional<Manager> findWithPropertiesById(UUID id);

    Optional<Manager> findByManagedProperties(Set<Property> managedProperties);
}
