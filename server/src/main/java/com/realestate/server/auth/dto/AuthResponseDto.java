package com.realestate.server.auth.dto;

import com.realestate.server.user.dto.UserResponseDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AuthResponseDto {
    private UserResponseDto user;
    private TokensDto tokens;
}
