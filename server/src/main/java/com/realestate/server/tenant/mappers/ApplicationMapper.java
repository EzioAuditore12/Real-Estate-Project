package com.realestate.server.tenant.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.property.dto.ApplicationDto;
import com.realestate.server.tenant.entites.Application;

@Mapper(componentModel = "spring")
public interface ApplicationMapper {
    
    @Mapping(source = "property.id", target = "propertyId")
    @Mapping(source = "tenant.id", target = "tenantId")
    @Mapping(source = "lease.id", target = "leaseId")
    ApplicationDto toDto(Application application);

}
