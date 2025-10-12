package com.realestate.server.tenant.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.server.tenant.entites.Payment;

@Repository
public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    
}
