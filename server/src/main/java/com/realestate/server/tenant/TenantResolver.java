package com.realestate.server.tenant;

import java.util.Objects;
import java.util.UUID;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

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

        if(Objects.isNull(tenant)) 
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"No such user found");

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
