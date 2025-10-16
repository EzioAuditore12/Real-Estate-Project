package com.realestate.server.tenant;

import java.util.UUID;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.realestate.server.auth.guards.AuthenticatedTenant;
import com.realestate.server.tenant.dto.tenant.TenantDto;
import com.realestate.server.tenant.services.TenantService;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class TenantResolver {

    private final TenantService tenantService;

    @QueryMapping
    public TenantDto getTenant(@Argument("id") UUID id) {
        return tenantService.findByUserId(id);
    }

    @AuthenticatedTenant
    @QueryMapping
    public TenantDto getAuthenticatedTenant() {

        String tenantId = SecurityContextHolder.getContext().getAuthentication().getName();

        return tenantService.findByUserId(UUID.fromString(tenantId));

    }

}
