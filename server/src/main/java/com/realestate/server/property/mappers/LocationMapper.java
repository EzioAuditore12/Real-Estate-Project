package com.realestate.server.property.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.dto.location.SaveLocationDto;
import com.realestate.server.property.entities.LocationEntity;

@Mapper(componentModel = "spring")
public interface LocationMapper {

    LocationDto toDto(LocationEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "properties", ignore = true)
    LocationEntity toEntity(SaveLocationDto dto);

    @Mapping(target = "properties", ignore = true)
    LocationEntity toEntity(LocationDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "coordinates", ignore = true)
    @Mapping(target = "properties", ignore = true)
    LocationEntity insertDtotoEntity(InsertLocationDto insertLocationDto);
}
