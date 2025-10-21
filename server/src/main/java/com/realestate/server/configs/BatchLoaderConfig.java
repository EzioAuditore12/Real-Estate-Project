package com.realestate.server.configs;

import java.util.UUID;

import org.springframework.context.annotation.Configuration;
import org.springframework.graphql.execution.BatchLoaderRegistry;

import com.realestate.server.application.ApplicationService;
import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.payment.PaymentService;
import com.realestate.server.payment.dto.PaymentDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.services.PropertyService;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;

@Configuration
@RequiredArgsConstructor
public class BatchLoaderConfig {

    private final ApplicationService applicationService;
    private final PaymentService paymentService;
    private final PropertyService propertyService;

    private final BatchLoaderRegistry batchLoaderRegistry;

    @PostConstruct
    public void registerBatchLoaders() {

        batchLoaderRegistry.forTypePair(UUID.class, ApplicationDto.class)
                .registerBatchLoader((keys, env) -> applicationService.findApplicationWithIds(keys));

        batchLoaderRegistry.forTypePair(UUID.class, PaymentDto.class)
                .registerBatchLoader((keys, env) -> paymentService.findPaymentWithIds(keys));

        batchLoaderRegistry.forTypePair(UUID.class, PropertyDto.class)
                .registerBatchLoader((keys, env) -> propertyService.findPropertyWithIds(keys));

    }

}
