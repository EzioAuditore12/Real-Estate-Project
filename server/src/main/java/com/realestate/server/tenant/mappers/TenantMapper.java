package com.realestate.server.tenant.mappers;

import java.util.Collections;
import java.util.Set;
import java.util.UUID;
import java.util.stream.Collectors;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.tenant.dto.tenant.CreateTenantDto;
import com.realestate.server.tenant.dto.tenant.TenantDto;
import com.realestate.server.tenant.dto.tenant.TenantProfileDto;
import com.realestate.server.tenant.dto.tenant.TenantSummaryDto;
import com.realestate.server.tenant.entites.Application;
import com.realestate.server.tenant.entites.Payment;
import com.realestate.server.tenant.entites.Tenant;

@Mapper(componentModel = "spring")
public interface TenantMapper {
    TenantDto toDto(Tenant tenant);

    TenantSummaryDto toSummaryDto(Tenant tenant);

    TenantProfileDto toProfileDto(TenantDto tenantDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "avatar", ignore = true)
    @Mapping(target = "applications", ignore = true)
    @Mapping(target = "payments", ignore = true)
    @Mapping(target = "propertyTenantPaymentApplications", ignore = true)
    Tenant toCreateEntity(CreateTenantDto createTenantDto);

    default Set<UUID> mapApplicationsToIds(Set<Application> applications) {
        if (applications == null)
            return Collections.emptySet();
        return applications.stream()
                .map(Application::getId)
                .collect(Collectors.toSet());
    }

    default Set<UUID> mapPaymentsToIds(Set<Payment> payments) {
        if (payments == null)
            return Collections.emptySet();
        return payments.stream()
                .map(Payment::getId)
                .collect(Collectors.toSet());
    }


}
