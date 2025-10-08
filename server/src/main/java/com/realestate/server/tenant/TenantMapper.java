package com.realestate.server.tenant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Named;

import com.realestate.server.tenant.dto.CreateTenantDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantResponseDto;
import com.realestate.server.tenant.entites.Tenant;
import com.realestate.server.property.entities.PropertyEntity;

import java.util.Collections;
import java.util.List;
import java.util.UUID;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    @Mapping(target = "favourites", source = "favourites", qualifiedByName = "propertyListToUuidList")
    @Mapping(target = "properties", source = "properties", qualifiedByName = "propertyListToUuidList")
    TenantDto toDto(Tenant entity);

    TenantResponseDto toResponseDto(TenantDto dto);

    @Mapping(target = "favourites", source = "favourites", qualifiedByName = "uuidListToPropertyList")
    @Mapping(target = "properties", source = "properties", qualifiedByName = "uuidListToPropertyList")
    Tenant toEntity(TenantDto dto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "favourites", ignore = true)
    @Mapping(target = "properties", ignore = true)
    Tenant fromCreateDto(CreateTenantDto dto);

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
        return uuids.stream()
                .map(id -> {
                    PropertyEntity entity = new PropertyEntity();
                    entity.setId(id);
                    return entity;
                })
                .toList();
    }
}
