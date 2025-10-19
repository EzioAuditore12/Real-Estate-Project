package com.realestate.server.tenant.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantIdPasswordDto {
    
    private UUID id;

    private String password;

}
