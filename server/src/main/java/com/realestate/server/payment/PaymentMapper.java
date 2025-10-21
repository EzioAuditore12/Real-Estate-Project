package com.realestate.server.payment;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.payment.dto.PaymentDto;
import com.realestate.server.payment.entities.Payment;

@Mapper(componentModel = "spring")
public interface PaymentMapper {

    @Mapping(target = "tenantId", source = "tenant.id")
    @Mapping(target = "propertyTenantPaymentApplicationId", source = "propertyTenantPaymentApplication.id")
    PaymentDto toDto(Payment payment);

}
