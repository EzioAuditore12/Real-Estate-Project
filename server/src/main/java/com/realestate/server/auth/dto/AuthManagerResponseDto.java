package com.realestate.server.auth.dto;

import com.realestate.server.manager.dto.ManagerResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthManagerResponseDto {
    
    private ManagerResponseDto manager;
    private TokensDto tokens;
}
