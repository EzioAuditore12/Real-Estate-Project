package com.realestate.server.payment.dto;

import java.time.LocalDateTime;
import java.util.UUID;

import com.realestate.server.payment.enums.PaymentStatusType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaymentDto {
    
    private UUID id;

    private Double amountDue;

    private LocalDateTime paymentDate;

    private LocalDateTime dueDate;

    private PaymentStatusType status;

    private UUID tenantId;

    private Long propertyTenantPaymentApplicationId;
}
