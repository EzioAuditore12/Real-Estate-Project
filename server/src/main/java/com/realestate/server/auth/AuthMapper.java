package com.realestate.server.auth;

import org.mapstruct.Mapper;

import com.realestate.server.auth.dto.AuthManagerResponseDto;
import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerResponseDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantResponseDto;

import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    TenantResponseDto toTenantResponseDto(TenantDto tenantDto);

    ManagerResponseDto toManagerResponseDto(ManagerDto managerDto);

    @Mapping(target = "tenant", source = "tenantDto")
    AuthResponseDto toAuthenticatedTenantResponseDto(TenantResponseDto tenantDto, TokensDto tokens);

    @Mapping(target = "manager", source = "managerDto")
    @Mapping(target = "tokens", source = "tokensDto")
    AuthManagerResponseDto toAuthenticatedManagerResponseDto(ManagerResponseDto managerDto, TokensDto tokensDto);

    @Mapping(target = "id", ignore = true)
    BlackListRefreshTokenEntity insertBlackListedToken(BlackListRefreshTokenDto dto);
}
