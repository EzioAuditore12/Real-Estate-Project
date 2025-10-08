package com.realestate.server.auth;

import org.mapstruct.Mapper;

import com.realestate.server.auth.dto.AuthManagerResponseDto;
import com.realestate.server.auth.dto.AuthTenantResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerSummaryDto;
import com.realestate.server.tenant.dto.tenant.TenantDto;
import com.realestate.server.tenant.dto.tenant.TenantSummaryDto;

import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    TenantSummaryDto toTenantResponseDto(TenantDto tenantDto);

    ManagerSummaryDto toManagerResponseDto(ManagerDto managerDto);

    @Mapping(target = "user", source = "tenantSummaryDto")
    @Mapping(target = "tokens", source = "tokens")
    @Mapping(target = "role", constant = "TENANT")
    AuthTenantResponseDto toAuthenticatedTenantResponseDto(TenantSummaryDto tenantSummaryDto, TokensDto tokens);

    @Mapping(target = "user", source = "managerSummaryDto")
    @Mapping(target = "tokens", source = "tokensDto")
    @Mapping(target = "role", constant = "MANAGER")
    AuthManagerResponseDto toAuthenticatedManagerResponseDto(ManagerSummaryDto managerSummaryDto, TokensDto tokensDto);

    @Mapping(target = "id", ignore = true)
    BlackListRefreshTokenEntity insertBlackListedToken(BlackListRefreshTokenDto dto);
}
