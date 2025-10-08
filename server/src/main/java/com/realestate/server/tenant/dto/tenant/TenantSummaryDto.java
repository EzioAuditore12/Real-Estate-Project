package com.realestate.server.tenant.dto.tenant;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantSummaryDto {
    
    private UUID id;

    private String name;
    
    private String email;
    
    private String avatar;

}
