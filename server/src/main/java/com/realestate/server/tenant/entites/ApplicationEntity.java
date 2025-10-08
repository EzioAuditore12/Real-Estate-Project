package com.realestate.server.tenant.entites;

import java.util.Date;
import java.util.UUID;

import com.realestate.server.property.entities.LeaseEntity;
import com.realestate.server.property.entities.PropertyEntity;
import com.realestate.server.tenant.enums.ApplicationStatus;

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
public class ApplicationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    private Date startDate;

    private ApplicationStatus status;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private PropertyEntity propertyId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = false)
    private Tenant tenantId;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 240, nullable = false)
    private String email;

    @Column(nullable = true)
    private String message;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id", nullable = true, unique = true)
    private LeaseEntity leaseId;
}
