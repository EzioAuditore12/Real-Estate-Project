package com.realestate.server.auth.dto.responses;

import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.enums.RoleType;
import com.realestate.server.manager.dto.ManagerPublicDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthManagerResponseDto {
    
    private ManagerPublicDto user;

    private TokensDto tokens;

    @Builder.Default
    private RoleType role = RoleType.MANAGER;  

}
