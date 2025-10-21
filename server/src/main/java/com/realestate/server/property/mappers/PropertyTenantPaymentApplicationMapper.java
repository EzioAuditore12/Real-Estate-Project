package com.realestate.server.property.mappers;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.property.dto.PropertyTenantPaymentApplicationDto;
import com.realestate.server.property.entities.PropertyTenantPaymentApplication;

@Mapper(componentModel = "spring")
public interface PropertyTenantPaymentApplicationMapper {
    
    @Mapping(target = "applicationId", source = "application.id")
    @Mapping(target = "tenantId", source = "tenant.id")
    @Mapping(target = "paymentId", source = "payment.id")
    @Mapping(target = "propertyId", source = "property.id")
    PropertyTenantPaymentApplicationDto toDto(PropertyTenantPaymentApplication propertyTenantPaymentApplication);
}
