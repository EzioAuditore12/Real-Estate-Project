package com.realestate.server.tenant.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TenantPublicDto {

    private UUID id;

    private String name;

    private String email;

    private String avatar;

    private LocalDateTime createdAt;

}
