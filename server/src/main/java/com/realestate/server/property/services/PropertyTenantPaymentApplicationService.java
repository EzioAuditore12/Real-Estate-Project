package com.realestate.server.property.services;

import java.util.List;

import org.springframework.stereotype.Service;

import com.realestate.server.property.dto.PropertyTenantPaymentApplicationDto;
import com.realestate.server.property.entities.PropertyTenantPaymentApplication;
import com.realestate.server.property.mappers.PropertyTenantPaymentApplicationMapper;
import com.realestate.server.property.repositories.PropertyTenantPaymentApplicationRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class PropertyTenantPaymentApplicationService {

    private final PropertyTenantPaymentApplicationRepository propertyTenantPaymentApplicationRepository;
    private final PropertyTenantPaymentApplicationMapper propertyTenantPaymentApplicationMapper;

    public Flux<PropertyTenantPaymentApplicationDto> findPropertyTenantPaymentApplicationWithIds(List<Long> ids) {

        List<PropertyTenantPaymentApplication> propertyTenantPaymentApplications = propertyTenantPaymentApplicationRepository
                .findAllById(ids);

        return Flux.fromIterable(
                propertyTenantPaymentApplications.stream().map(propertyTenantPaymentApplicationMapper::toDto).toList());

    }

}
