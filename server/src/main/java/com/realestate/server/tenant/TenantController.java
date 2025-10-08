package com.realestate.server.tenant;

import java.util.Objects;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.guards.AuthenticatedTenant;
import com.realestate.server.common.dto.BaseResponseDto;
import com.realestate.server.tenant.dto.tenant.TenantProfileDto;

import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tenant")
@RequiredArgsConstructor
@Tag(name = "Tenant")
public class TenantController {

    private final TenantService tenantService;
    private final TenantMapper tenantMapper;

    @GetMapping
    @AuthenticatedTenant
    public BaseResponseDto<TenantProfileDto> helloTenant(
            @Parameter(name = "Authorization", description = "Bearer token", required = true, example = "Bearer <token>") @org.springframework.web.bind.annotation.RequestHeader("Authorization") String authorizationHeader) {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        var tenant = tenantService.findByUserId(java.util.UUID.fromString(userId));

        return new BaseResponseDto<>(true, "User Verified successfully", tenantMapper.toProfileDto(tenant));
    }

    @GetMapping("/{id}")
    public BaseResponseDto<TenantProfileDto> getTenantProfile(@PathVariable("id") @UUID String id) {
        var tenant = tenantService.findByUserId(java.util.UUID.fromString(id));

        if(Objects.isNull(tenant)){
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"Not user with this id is there");
        }

        return new BaseResponseDto<>(true, "Tenant profile fetched successfully", tenantMapper.toProfileDto(tenant));
    }
}
