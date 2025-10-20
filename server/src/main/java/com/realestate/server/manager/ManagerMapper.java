package com.realestate.server.manager;

import java.util.Set;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.realestate.server.common.utils.MapUtils;
import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerPublicDto;
import com.realestate.server.manager.entities.Manager;
import com.realestate.server.property.entities.Property;


@Mapper(componentModel = "spring")
public interface ManagerMapper {
    
    @Mapping(source = "managedProperties", target = "managedPropertyIds", qualifiedByName = "managedPropertyToUuids")
    ManagerDto toDto(Manager manager);

    ManagerPublicDto toPublicDto(ManagerDto managerDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "managedProperties", ignore = true)
    Manager fromCreateDto(CreateManagerDto createManagerDto);

    @Named("managedPropertyToUuids")
    default Set<UUID> managedPropertiesToUuids(Set<Property> properties) {
        return MapUtils.extractKeysFromSet(properties, Property::getId);
    }

}
