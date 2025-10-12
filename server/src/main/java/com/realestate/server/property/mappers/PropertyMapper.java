package com.realestate.server.property.mappers;

import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertySummaryDto;
import com.realestate.server.property.entities.Property;
import com.realestate.server.tenant.entites.Application;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

@Mapper(componentModel = "spring", uses = { LocationMapper.class })
public interface PropertyMapper {

    @Mapping(source = "location", target = "location") // FIX 1: Map to 'location' object, not 'locationId'
    @Mapping(source = "manager.id", target = "managerId")
    @Mapping(source = "applications", target = "applicationIds", qualifiedByName = "applicationsToIds")
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

    @Named("applicationsToIds")
    default Set<UUID> applicationsToIds(Set<Application> applications) { // FIX 2: Change return type to Set<UUID>
        if (applications == null || applications.isEmpty()) {
            return Collections.emptySet(); // FIX 3: Return an empty set
        }
        return applications.stream()
                .map(Application::getId)
                .collect(Collectors.toSet()); // FIX 4: Collect to a Set
    }
}
