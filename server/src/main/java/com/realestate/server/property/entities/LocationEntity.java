package com.realestate.server.property.entities;

import java.util.List;
import java.util.UUID;

import org.springframework.data.geo.Point;

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

    @Column(columnDefinition = "geography(Point,4326)", nullable = false)
    private Point coordinates;

    @OneToMany(mappedBy = "locationId")
    private List<PropertyEntity> properties;
}
