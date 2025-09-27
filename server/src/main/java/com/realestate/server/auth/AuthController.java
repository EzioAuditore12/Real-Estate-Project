package com.realestate.server.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.LoginTenantDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterTenantDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.common.dto.BaseResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for validating user")
public class AuthController {

    private final AuthService authService;

    @PostMapping("register-tenant")
    @ResponseStatus(code = HttpStatus.CREATED)
    @Operation(summary = "Register a new tenant", description = "Creates a new tenant account with the provided details.")
    public BaseResponseDto<AuthResponseDto> register(@Valid @RequestBody RegisterTenantDto registerTenantDto) {
        AuthResponseDto credentials = authService.registerTenant(registerTenantDto);

        return new BaseResponseDto<>(true, "Tenant Registered Successully", credentials);
    }

    @PostMapping("login-tenant")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Login tenant", description = "Validates tenant credentials and logs in the tenant.")
    public BaseResponseDto<AuthResponseDto> login(@Valid @RequestBody LoginTenantDto loginTenantDto) {
        AuthResponseDto credentials = authService.validateTenant(loginTenantDto);

        return new BaseResponseDto<>(true, "User logged in successfully", credentials);
    }

    @PostMapping("refresh")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Refresh Tokens", description = "Validates refresh token and regenerates new access and refresh tokens")
    public TokensDto refreshTokens(@RequestBody RefreshTokensDto refreshTokensDto) {
        return authService.regenerateTokens(refreshTokensDto);
    }
}
