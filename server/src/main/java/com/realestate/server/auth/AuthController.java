package com.realestate.server.auth;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.LoginUserDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterUserDto;
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

    @PostMapping("register")
    @ResponseStatus(code = HttpStatus.CREATED)
    @Operation(summary = "Register a new user", description = "Creates a new user account with the provided details.")
    public BaseResponseDto<AuthResponseDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        AuthResponseDto credentials = authService.registerUser(registerUserDto);

        return new BaseResponseDto<>(true, "User Registered Successully", credentials);
    }

    @PostMapping("login")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Login user", description = "Validates user credentials and logs in the user.")
    public BaseResponseDto<AuthResponseDto> login(@Valid @RequestBody LoginUserDto loginUserDto) {
        AuthResponseDto credentials = authService.validateUser(loginUserDto);

        return new BaseResponseDto<>(true, "User logged in successfully", credentials);
    }

    @PostMapping("refresh")
    @ResponseStatus(code = HttpStatus.ACCEPTED)
    @Operation(summary = "Refresh Tokens", description = "Validates refresh token and regenerates new access and refresh tokens")
    public TokensDto refreshTokens(@RequestBody RefreshTokensDto refreshTokensDto) {
        return authService.regenerateTokens(refreshTokensDto);
    }
}
