package com.realestate.server.payment.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.payment.entities.Payment;

public interface PaymentRepository extends JpaRepository<Payment, UUID> {
    
}
