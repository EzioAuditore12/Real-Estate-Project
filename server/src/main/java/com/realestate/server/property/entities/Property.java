package com.realestate.server.property.entities;

import com.realestate.server.manager.entites.Manager;
import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.tenant.entites.Application;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import org.hibernate.annotations.CreationTimestamp;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Property {

    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 250, nullable = false)
    private String description;

    @Column(nullable = false)
    private Double pricePerMonth = 0.0;

    @Column(nullable = false)
    private Double securityDeposit = 0.0;

    @Column(nullable = false)
    private List<String> photoUrls = new ArrayList<>();

    @Column(nullable = false)
    private List<AmenityType> amenities;

    @Column(nullable = false)
    private List<HighlightType> highlights;

    @Column(nullable = false)
    private boolean petAllowed = false;

    @Column(nullable = false)
    private boolean parkingIncluded = false;

    @Column(nullable = false)
    private Integer beds = 0;

    @Column(nullable = false)
    private Integer baths = 0;

    @Column(nullable = false)
    private Double squareFeet;

    @CreationTimestamp
    @Column(nullable = false, updatable = false)
    private LocalDateTime postedDate;

    @Column(nullable = false)
    private Double averageRatings = 0.0;

    @Column(nullable = false)
    private Double numberOfRatings = 0.0;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "location_id", referencedColumnName = "id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Location location;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "property_manager_id")
    @EqualsAndHashCode.Exclude
    @ToString.Exclude
    private Manager manager;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<Application> applications;

    @OneToMany(mappedBy = "property", cascade = CascadeType.ALL, orphanRemoval = true)
    private Set<PropertyTenantPaymentApplication> propertyTenantPaymentApplications;

}
