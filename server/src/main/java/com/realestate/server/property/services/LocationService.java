package com.realestate.server.property.services;

import org.locationtech.jts.geom.Point;
import org.locationtech.jts.geom.Coordinate;
import org.locationtech.jts.geom.GeometryFactory;
import org.locationtech.jts.geom.PrecisionModel;
import org.springframework.stereotype.Service;

import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.location.SaveLocationDto;
import com.realestate.server.property.entities.LocationEntity;
import com.realestate.server.property.mappers.LocationMapper;
import com.realestate.server.property.repositories.LocationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LocationService {

    private final LocationRepository locationRepository;
    private final LocationMapper locationMapper;

    public LocationEntity insertLocation(InsertLocationDto insertLocationDto) {

        GeometryFactory geometryFactory = new GeometryFactory(new PrecisionModel(),4326);

        Point point = geometryFactory.createPoint(new Coordinate(insertLocationDto.getLatitude(),insertLocationDto.getLongitude()));

        SaveLocationDto location = new SaveLocationDto();

        location.setAddress(insertLocationDto.getAddress());
        location.setCity(insertLocationDto.getCity());
        location.setState(insertLocationDto.getState());
        location.setCountry(insertLocationDto.getCountry());
        location.setCoordinates(point);

        LocationEntity locationEntity = locationMapper.toEntity(location);

        return locationRepository.save(locationEntity);

    }
}
