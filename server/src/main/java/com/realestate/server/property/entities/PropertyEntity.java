package com.realestate.server.property.entities;

import com.realestate.server.manager.entites.ManagerEntity;
import com.realestate.server.property.enums.Amenity;
import com.realestate.server.property.enums.Highlight;
import com.realestate.server.property.enums.PropertyType;
import com.realestate.server.tenant.entites.ApplicationEntity;
import com.realestate.server.tenant.entites.TenantEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.JoinTable;
import jakarta.persistence.ManyToMany;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Entity
@Data
public class PropertyEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 250, nullable = false)
    private String description;

    @Column(nullable = false)
    private Float pricePerMonth;

    @Column(nullable = false)
    private  Float securityDeposit;

    private List<String> photoUrls;

    private List<Amenity> amenities;

    private List<Highlight> highlights;

    private boolean isPetsAllowed = false;

    private boolean isParkingIncluded = false;

    @Column(nullable = false)
    private int beds;

    @Column(nullable = false)
    private float baths;

    @Column(nullable = false)
    private int squareFeet;

    @Column(nullable = false)
    private PropertyType propertyType;

    @Column(updatable = false)
    private Date postedDate = new Date();

    @Column(nullable = true)
    private float averageRating = 0;

    @Column(nullable = true)
    private int numberOfReviews = 0;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private LocationEntity locationId;

    @ManyToOne
    @JoinColumn(referencedColumnName = "id")
    private ManagerEntity managerId;

    @OneToMany(mappedBy = "propertyId")
    private List<LeaseEntity> leases;

    @OneToMany(mappedBy = "propertyId")
    private List<ApplicationEntity> applications;

    @ManyToMany
    @JoinTable(
        joinColumns = @JoinColumn(),
        inverseJoinColumns = @JoinColumn()
    )
    private List<TenantEntity> favouritedBy;

    @ManyToMany
    @JoinTable(
        joinColumns = @JoinColumn(),
        inverseJoinColumns = @JoinColumn()
    )
    private List<TenantEntity> tenants;
}
