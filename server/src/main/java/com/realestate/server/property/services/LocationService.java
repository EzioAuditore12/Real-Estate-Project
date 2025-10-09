package com.realestate.server.property.services;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.entities.Location;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.repositories.LocationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;

    public void insertSavedLocation(InsertLocationDto insertLocationDto, Property savedProperty) {

        // Create Point geometry
        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);
        Point coordinates = geometryFactory.createPoint(
                new Coordinate(insertLocationDto.getLongitude(), insertLocationDto.getLatitude()));

        // Build location with property reference
        Location location = Location.builder()
                .address(insertLocationDto.getAddress())
                .city(insertLocationDto.getCity())
                .state(insertLocationDto.getState())
                .country(insertLocationDto.getCountry())
                .postalCode(insertLocationDto.getPostalCode())
                .coordinates(coordinates)
                .property(savedProperty) // THIS WAS MISSING!
                .build();

        locationRepository.save(location);
    }
}
