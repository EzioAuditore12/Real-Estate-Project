package com.realestate.server.auth;

import org.mapstruct.Mapper;

import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantResponseDto;

import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    TenantResponseDto toTenantResponseDto(TenantDto tenantDto);

    @Mapping(target = "tenant", source = "tenantDto")
    AuthResponseDto toAuthenticatedTenantResponseDto(TenantResponseDto tenantDto, TokensDto tokens);

    @Mapping(target = "id", ignore = true)
    BlackListRefreshTokenEntity insertBlackListedToken(BlackListRefreshTokenDto dto);
}
