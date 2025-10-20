package com.realestate.server.application.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.application.entities.Lease;

public interface LeaseRepository extends JpaRepository<Lease, UUID> {
    
}
