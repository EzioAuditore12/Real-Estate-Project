package com.realestate.server.tenant.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.tenant.entites.Lease;

public interface LeaseRepository extends JpaRepository<Lease, UUID> {
    
}
