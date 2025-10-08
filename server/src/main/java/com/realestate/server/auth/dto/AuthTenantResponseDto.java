package com.realestate.server.auth.dto;

import com.realestate.server.auth.enums.Role;
import com.realestate.server.tenant.dto.tenant.TenantSummaryDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthTenantResponseDto {
    private TenantSummaryDto user;
    private TokensDto tokens;
    @Builder.Default
    private Role role = Role.TENANT;
}
