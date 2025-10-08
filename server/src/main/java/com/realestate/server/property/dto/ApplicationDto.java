package com.realestate.server.property.dto;

import com.realestate.server.tenant.enums.ApplicationStatusType;

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
    private Date startDate;
    private ApplicationStatusType status;
    private UUID propertyId;
    private UUID tenantId;
    private String name;
    private String email;
    private String message;
    private UUID leaseId;
}
