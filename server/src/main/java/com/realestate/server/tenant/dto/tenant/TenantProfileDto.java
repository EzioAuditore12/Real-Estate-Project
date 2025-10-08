package com.realestate.server.tenant.dto.tenant;

import java.util.Set;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantProfileDto {

    private String id;

    private String name;

    private String email;

    private String avatar;

    private Set<UUID> applications;
}
