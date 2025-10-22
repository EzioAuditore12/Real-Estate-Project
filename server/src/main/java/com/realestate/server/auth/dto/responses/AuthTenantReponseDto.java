package com.realestate.server.auth.dto.responses;

import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.enums.RoleType;
import com.realestate.server.tenant.dto.TenantPublicDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthTenantReponseDto {
    
    private TenantPublicDto user;

    private TokensDto tokens;

    @Builder.Default
    private RoleType role = RoleType.TENANT;

}
