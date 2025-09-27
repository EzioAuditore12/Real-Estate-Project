package com.realestate.server.tenant.entites;

import java.util.Date;
import java.util.UUID;

import com.realestate.server.property.entities.LeaseEntity;
import com.realestate.server.tenant.enums.PaymentStatus;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;

@Entity
@Data
public class PaymentEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private float amountDue;

    @Column(nullable = false)
    private float amountPaid;

    @Column(nullable = false)
    private Date dueDate;

    @Column(nullable = false)
    private Date paymentDate;

    @Column(nullable = false)
    private PaymentStatus paymentStatus;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private LeaseEntity leaseId;
}
