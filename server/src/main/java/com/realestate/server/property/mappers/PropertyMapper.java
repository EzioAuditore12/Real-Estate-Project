package com.realestate.server.property.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertySummaryDto;
import com.realestate.server.property.entities.Property;

@Mapper(componentModel = "spring")
public interface PropertyMapper {

    @Mapping(target = "applicationIds", ignore = true)
    @Mapping(target = "managerId", source = "manager.id")
    @Mapping(target = "propertyTenantPaymentApplicationIds", ignore = true)
    PropertyDto toDto(Property property);

    @Mapping(target = "photoUrls", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Mapping(target = "averageRatings", ignore = true)
    @Mapping(target = "id", ignore = true)
    @Mapping(target = "location", ignore = true)
    @Mapping(target = "manager", ignore = true)
    @Mapping(target = "numberOfRatings", ignore = true)
    @Mapping(target = "postedDate", ignore = true)
    @Mapping(target = "propertyTenantPaymentApplications", ignore = true)
    Property toCreateEntity(CreatePropertyDto createPropertyDto);

    @Mapping(target = "managerId", source = "manager.id")
    PropertySummaryDto toSummaryDto(Property property);

}
