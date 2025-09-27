package com.realestate.server.auth.dto;

import com.realestate.server.tenant.dto.TenantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {
    private TenantResponseDto tenant;
    private TokensDto tokens;
}
