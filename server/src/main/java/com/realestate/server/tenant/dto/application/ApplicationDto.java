package com.realestate.server.tenant.dto.application;

import com.realestate.server.tenant.enums.ApplicationStatusType;

import java.time.LocalDateTime;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ApplicationDto {

    private UUID id;

    private LocalDateTime startDate;

    private ApplicationStatusType status;

    private UUID propertyId;

    private UUID tenantId;
    
    private UUID leaseId;
}
