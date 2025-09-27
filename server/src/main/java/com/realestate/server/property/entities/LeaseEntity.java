package com.realestate.server.property.entities;

import java.util.Date;
import java.util.List;
import java.util.UUID;

import com.realestate.server.tenant.entites.ApplicationEntity;
import com.realestate.server.tenant.entites.PaymentEntity;
import com.realestate.server.tenant.entites.TenantEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Entity
@Data
public class LeaseEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(nullable = false)
    private Date startDate;
    
    @Column(nullable = false)
    private Date endDate;

    @Column(nullable = false)
    private float rent;

    @Column(nullable = false)
    private float deposit;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private PropertyEntity propertyId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private TenantEntity tenantId;

    @OneToOne(mappedBy = "leaseId")
    private ApplicationEntity application;

    @OneToMany(mappedBy = "leaseId")
    private List<PaymentEntity> payments;
}
