package com.realestate.server.auth.dto;

import java.util.UUID;

import com.realestate.server.auth.enums.RoleType;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class AuthenticatedUserDto {
    
    private UUID id;

    private String password;

    private RoleType role;

}
