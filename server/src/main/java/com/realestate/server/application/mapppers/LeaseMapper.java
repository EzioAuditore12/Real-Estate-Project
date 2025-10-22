package com.realestate.server.application.mapppers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.application.dto.LeaseDto;
import com.realestate.server.application.entities.Lease;

@Mapper(componentModel = "spring")
public interface LeaseMapper {
    
    @Mapping(target = "applicationId", source = "application.id")
    LeaseDto toDto(Lease lease);

}
