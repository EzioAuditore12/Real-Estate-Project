package com.realestate.server.property.mappers;

import java.util.Set;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.realestate.server.application.entities.Application;
import com.realestate.server.common.utils.MapUtils;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.entities.PropertyTenantPaymentApplication;

@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface PropertyMapper {

    @Mapping(source = "location", target = "location")
    @Mapping(source = "manager.id", target = "managerId")
    @Mapping(source = "applications", target = "applicationIds", qualifiedByName = "applicationToUuids")
    @Mapping(source = "propertyTenantPaymentApplications", target = "propertyTenantPaymentApplicationIds", qualifiedByName = "propertyTenantPaymentApplicationsToIds")
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

    @Named("applicationToUuids")
    default Set<UUID> mapApplicationToIds(Set<Application> applications) {
        return MapUtils.extractKeysFromSet(applications, Application::getId);
    }

    @Named("propertyTenantPaymentApplicationsToIds")
    default Set<Long> mappropertyTenantPaymentApplicationsToIds(
            Set<PropertyTenantPaymentApplication> propertyTenantPaymentApplications) {

        return MapUtils.extractKeysFromSet(propertyTenantPaymentApplications, PropertyTenantPaymentApplication::getId);

    }

}
