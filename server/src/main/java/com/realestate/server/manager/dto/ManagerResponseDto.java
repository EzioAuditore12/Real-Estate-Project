package com.realestate.server.manager.dto;

import java.util.List;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ManagerResponseDto {
    private String id;
    private String name;
    private String email;
    private List<UUID> managedProperties;
}
