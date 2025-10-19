package com.realestate.server.tenant;

import java.util.UUID;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.realestate.server.auth.guards.AuthenticatedTenant;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.dto.TenantPublicDto;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TenantResolver {

    private final TenantService tenantService;
    private final TenantMapper tenantMapper;

    @QueryMapping
    public TenantPublicDto getTenant(@Argument UUID id) {

        TenantDto tenant = tenantService.findById(id);

        return tenantMapper.toPublicDto(tenant);

    }

    @AuthenticatedTenant
    @QueryMapping
    public TenantPublicDto getAuthenticatedTenant() {

        String id = SecurityContextHolder.getContext().getAuthentication().getName();

        TenantDto tenant = tenantService.findById(UUID.fromString(id));

        return tenantMapper.toPublicDto(tenant);

    }
}
