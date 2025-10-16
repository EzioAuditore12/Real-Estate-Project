package com.realestate.server.tenant.dto.tenant;

import java.util.Set;
import java.util.UUID;

import com.realestate.server.property.dto.ApplicationDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class TenantDto {

    private UUID id;

    private String name;

    private String email;

    private String password;

    private String avatar;

    private Set<ApplicationDto> applications;

    private Set<UUID> payments;

}
