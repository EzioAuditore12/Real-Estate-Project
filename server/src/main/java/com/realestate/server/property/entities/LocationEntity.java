package com.realestate.server.property.entities;

import java.util.List;
import java.util.UUID;

import com.realestate.server.common.dto.CoordinatesDto;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class LocationEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;

    @Column(length = 100, nullable = false)
    private String address;

    @Column(length = 50, nullable = false)
    private String city;

    @Column(length = 50, nullable = false)
    private String state;

    @Column(length = 64, nullable = false)
    private String country;

    @Column(length = 20, nullable = false)
    private String postalCode;

    // This will automatically use your converter
    @Column(name = "coordinates", columnDefinition = "TEXT")
    private CoordinatesDto coordinates;

    @OneToMany(mappedBy = "locationId")
    private List<PropertyEntity> properties;
}
