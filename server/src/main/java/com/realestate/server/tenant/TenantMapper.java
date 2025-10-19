package com.realestate.server.tenant;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.tenant.dto.CreateTenantDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantPublicDto;
import com.realestate.server.tenant.entities.Tenant;

@Mapper(componentModel = "spring")
public interface TenantMapper {

    TenantDto toDto(Tenant tenant);

    TenantPublicDto toPublicDto(TenantDto tenantDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    Tenant fromCreateDto(CreateTenantDto createTenantDto);

}
