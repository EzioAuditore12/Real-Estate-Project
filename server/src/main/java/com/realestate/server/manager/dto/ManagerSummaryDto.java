package com.realestate.server.manager.dto;

import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ManagerSummaryDto {

    private UUID id;

    private String name;

    private String email;

    private String avatar;
}
