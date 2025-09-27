package com.realestate.server.tenant.dto;

import com.realestate.server.tenant.enums.ApplicationStatus;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {
    private UUID id;
    private String name;
    private String email;
    private String message;
    private Date startDate;
    private ApplicationStatus status;
    private UUID tenantId;
    private UUID leaseId;
}
