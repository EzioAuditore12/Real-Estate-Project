package com.realestate.server.property.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.entities.Location;

@Mapper(componentModel = "spring")
public interface LocationMapper {
    
    @Mapping(target = "longitude", source = "coordinates.x")
    @Mapping(target = "latitude", source = "coordinates.y")
    LocationDto toDto(Location location);
}
