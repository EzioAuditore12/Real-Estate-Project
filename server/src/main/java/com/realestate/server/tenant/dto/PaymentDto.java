package com.realestate.server.tenant.dto;

import com.realestate.server.tenant.enums.PaymentStatus;

import java.util.Date;
import java.util.UUID;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaymentDto {
    private UUID id;
    private float amountDue;
    private float amountPaid;
    private Date dueDate;
    private Date paymentDate;
    private PaymentStatus paymentStatus;
    private UUID leaseId;
}
