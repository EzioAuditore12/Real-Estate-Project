package com.realestate.server.manager.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerDto {
    private UUID id;
    private String name;
    private String email;
    private List<UUID> managedProperties;
}
