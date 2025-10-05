package com.realestate.server.manager;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerResponseDto;
import com.realestate.server.manager.entites.ManagerEntity;
import com.realestate.server.property.entities.PropertyEntity;

@Mapper(componentModel = "spring")
public interface ManagerMapper {

    @Mapping(target = "managedProperties", source = "managedProperties", qualifiedByName = "propertyListToUuidList")
    ManagerDto toDto(ManagerEntity entity);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "managedProperties", ignore = true)
    ManagerEntity fromCreateDto(CreateManagerDto dto);

    ManagerResponseDto tResponseDto(ManagerDto dto);

    @Named("propertyListToUuidList")
    default List<UUID> propertyListToUuidList(List<PropertyEntity> entities) {
        if (entities == null)
            return Collections.emptyList();
        return entities.stream()
                .map(PropertyEntity::getId)
                .toList();
    }

    @Named("uuidListToPropertyList")
    default List<PropertyEntity> uuidListToPropertyList(List<UUID> uuids) {
        if (uuids == null)
            return Collections.emptyList();
        // You may want to fetch entities from DB here in a real app
        // For now, just create empty PropertyEntity with id set
        return uuids.stream()
                .map(id -> {
                    PropertyEntity entity = new PropertyEntity();
                    entity.setId(id);
                    return entity;
                })
                .toList();
    }
}
