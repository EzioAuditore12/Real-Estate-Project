package com.realestate.server.property.mappers;

import java.util.List;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.realestate.server.manager.entites.ManagerEntity;
import com.realestate.server.property.dto.CreatePropertyDto;
import com.realestate.server.property.dto.PropertyDto;
import com.realestate.server.property.entities.PropertyEntity;
import com.realestate.server.property.entities.LocationEntity;
import com.realestate.server.property.enums.Highlight;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    // Map LocationEntity to UUID
    default UUID map(LocationEntity location) {
        return location != null ? location.getId() : null;
    }

    // Map ManagerEntity to UUID
    default UUID map(ManagerEntity manager) {
        return manager != null ? manager.getId() : null;
    }

    @Mapping(target = "leaseIds", ignore = true)
    @Mapping(target = "applicationIds", ignore = true)
    @Mapping(target = "favouritedByTenantIds", ignore = true)
    @Mapping(target = "tenantIds", ignore = true)
    PropertyDto toDto(PropertyEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "photoUrls", ignore = true)
    @Mapping(target = "postedDate", ignore = true)
    @Mapping(target = "averageRating", ignore = true)
    @Mapping(target = "numberOfReviews", ignore = true)
    @Mapping(target = "locationId", ignore = true)
    @Mapping(target = "managerId", ignore = true)
    @Mapping(target = "leases", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Mapping(target = "favouritedBy", ignore = true)
    @Mapping(target = "tenants", ignore = true)
    @Mapping(target = "highlights", ignore = true) // Add this to ignore highlights mapping
    PropertyEntity fromCreateDto(CreatePropertyDto createPropertyDto);
}
