package com.realestate.server.auth.controllers;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.dto.AuthManagerResponseDto;
import com.realestate.server.auth.dto.LoginManagerDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterManagerDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.enums.Role;
import com.realestate.server.auth.services.AuthManagerService;
import com.realestate.server.common.dto.BaseResponseDto;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("auth/manager")
@RequiredArgsConstructor
@Tag(name = "Authentication", description = "Endpoints for validating manager")
public class AuthManagerController {

    private final AuthManagerService authManagerService;

    @PostMapping("register")
    @ResponseStatus(code = HttpStatus.CREATED)
    @Operation(summary = "Register a new manager", description = "Creates a new tenant account with the provided details.")
    public BaseResponseDto<AuthManagerResponseDto> register(@Valid @RequestBody RegisterManagerDto registerManagerDto) {
        AuthManagerResponseDto credentials = authManagerService.registerManager(registerManagerDto);

        return new BaseResponseDto<>(true, "Manager Registered Successully", credentials);
    }

    @PostMapping("login")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Login manager", description = "Validates tenant credentials and logs in the tenant.")
    public BaseResponseDto<AuthManagerResponseDto> login(@Valid @RequestBody LoginManagerDto loginManagerDto) {
        AuthManagerResponseDto credentials = authManagerService.validateManager(loginManagerDto);

        return new BaseResponseDto<>(true, "User logged in successfully", credentials);
    }

    @PostMapping("refresh")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Refresh Tokens Manager", description = "Validates refresh token and regenerates new access and refresh tokens")
    public TokensDto refreshTenantTokens(@RequestBody RefreshTokensDto refreshTokensDto) {
        return authManagerService.regenerateTokens(refreshTokensDto, Role.MANAGER);
    }
}
