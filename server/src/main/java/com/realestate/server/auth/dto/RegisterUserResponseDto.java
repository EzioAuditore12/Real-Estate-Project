package com.realestate.server.auth.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class RegisterUserResponseDto {
    private String id;
    private String name;
    private String email;
    private String avatar;
}
