package com.realestate.server.tenant;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.dataloader.DataLoader;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.application.ApplicationService;
import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.application.dto.CreateApplicationDto;
import com.realestate.server.auth.guards.AuthenticatedTenant;
import com.realestate.server.payment.dto.PaymentDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantPublicDto;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TenantResolver {

    private final TenantService tenantService;
    private final TenantMapper tenantMapper;

    private final ApplicationService applicationService;


    @QueryMapping
    public TenantPublicDto getTenant(@Argument UUID id) {

        TenantDto tenant = tenantService.findById(id);

        if (Objects.isNull(tenant))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user found");

        return tenantMapper.toPublicDto(tenant);

    }

    @AuthenticatedTenant
    @QueryMapping
    public TenantPublicDto getAuthenticatedTenant() {

        String id = SecurityContextHolder.getContext().getAuthentication().getName();

        TenantDto tenant = tenantService.findById(UUID.fromString(id));

        return tenantMapper.toPublicDto(tenant);

    }

    @AuthenticatedTenant
    @MutationMapping
    public ApplicationDto createApplication(@Argument("input") CreateApplicationDto createApplicationDto) {

        String id = SecurityContextHolder.getContext().getAuthentication().getName();

        return applicationService.createApplication(UUID.fromString(id), createApplicationDto);

    }

    @SchemaMapping(typeName = "Tenant", field = "applications")
    public CompletableFuture<List<ApplicationDto>> getApplications(TenantPublicDto tenantPublicDto,
            DataLoader<UUID, ApplicationDto> dataLoader) {

        Set<UUID> ids = tenantPublicDto.getApplicationIds();

        return dataLoader.loadMany(new ArrayList<>(ids));

    }

    @SchemaMapping(typeName = "Tenant", field = "payments")
    public CompletableFuture<List<PaymentDto>> getPayments(TenantPublicDto tenantPublicDto,
            DataLoader<UUID, PaymentDto> dataLoader) {

        Set<UUID> ids = tenantPublicDto.getPaymentIds();

        return dataLoader.loadMany(new ArrayList<>(ids));

    }
}
