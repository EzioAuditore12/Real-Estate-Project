package com.realestate.server.manager;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerProfileDto;
import com.realestate.server.manager.dto.ManagerSummaryDto;
import com.realestate.server.manager.entites.Manager;
import com.realestate.server.property.entities.Property;

@Mapper(componentModel = "spring")
public interface ManagerMapper {

    ManagerDto toDto(Manager entity);

    ManagerSummaryDto toSummaryDto(Manager manager);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "managedProperties", ignore = true)
    Manager fromCreateDto(CreateManagerDto dto);

    ManagerProfileDto toProfileDto(ManagerDto dto);

    default Set<UUID> mapPropertiesToIds(Set<Property> properties) {
        if (properties == null)
            return Collections.emptySet();
        return properties.stream()
                .map(Property::getId)
                .collect(Collectors.toSet());
    }
}
