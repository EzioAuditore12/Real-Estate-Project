package com.realestate.server.tenant.dto.tenant;

import java.util.Set;
import java.util.UUID;

import com.realestate.server.property.dto.ApplicationDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantProfileDto {

    private UUID id;

    private String name;

    private String email;

    private String avatar;

    private Set<ApplicationDto> applications;
}
