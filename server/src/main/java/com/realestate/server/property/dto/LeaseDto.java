package com.realestate.server.property.dto;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class LeaseDto {
    private UUID id;
    private Date startDate;
    private Date endDate;
    private float rent;
    private float deposit;
    private UUID propertyId;
    private UUID tenantId;
    private UUID applicationId;
}
