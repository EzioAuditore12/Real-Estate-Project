package com.realestate.server.auth.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.dto.AuthTenantResponseDto;
import com.realestate.server.auth.dto.LoginTenantDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterTenantDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.enums.Role;
import com.realestate.server.auth.services.AuthTenantService;
import com.realestate.server.common.dto.BaseResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth/tenant")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for validating tenant")
public class AuthTenantController {

    private final AuthTenantService authTenantService;

    @PostMapping(value = "register", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @ResponseStatus(code = HttpStatus.CREATED)
    @Operation(summary = "Register a new tenant", description = "Creates a new tenant account with the provided details.")
    public BaseResponseDto<AuthTenantResponseDto> register(  @Valid @ModelAttribute RegisterTenantDto registerTenantDto) {
        AuthTenantResponseDto credentials = authTenantService.registerTenant(registerTenantDto);

        return new BaseResponseDto<>(true, "Tenant Registered Successully", credentials);
    }

    @PostMapping("login")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Login tenant", description = "Validates tenant credentials and logs in the tenant.")
    public BaseResponseDto<AuthTenantResponseDto> login(@Valid @RequestBody LoginTenantDto loginTenantDto) {
        AuthTenantResponseDto credentials = authTenantService.validateTenant(loginTenantDto);

        return new BaseResponseDto<>(true, "User logged in successfully", credentials);
    }

    @PostMapping("refresh")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Refresh Tokens", description = "Validates refresh token and regenerates new access and refresh tokens")
    public TokensDto refreshTenantTokens(@RequestBody RefreshTokensDto refreshTokensDto) {
        return authTenantService.regenerateTokens(refreshTokensDto, Role.TENANT);
    }
}
