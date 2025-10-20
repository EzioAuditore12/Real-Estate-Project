package com.realestate.server.property.services;

import java.util.Objects;

import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.entities.Location;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.mappers.LocationMapper;
import com.realestate.server.property.repositories.LocationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public Location insertSavedLocation(InsertLocationDto insertLocationDto, Property savedProperty) {

        Point coordinates = convertToCoordinates(insertLocationDto.getLongitude(), insertLocationDto.getLatitude());

        Location location = Location.builder()
                .address(insertLocationDto.getAddress())
                .city(insertLocationDto.getCity())
                .state(insertLocationDto.getState())
                .country(insertLocationDto.getCountry())
                .postalCode(insertLocationDto.getPostalCode())
                .coordinates(coordinates)
                .property(savedProperty)
                .build();

        return locationRepository.save(location);
    }

     public LocationDto findLocationByLongitudeAndLatitude(Double longitude, Double latitude) {

        Point point = convertToCoordinates(longitude, latitude);

        Location location = locationRepository.findByCoordinates(point).orElse(null);
        
        if(Objects.isNull(location)) return null;

        return locationMapper.toDto(location);
    }


    private Point convertToCoordinates(Double longitude, Double latitude) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(), 4326);

        return geometryFactory.createPoint(
                new Coordinate(longitude, latitude));

    }
}
