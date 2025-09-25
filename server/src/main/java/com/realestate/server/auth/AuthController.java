package com.realestate.server.auth;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.dto.LoginUserDto;
import com.realestate.server.auth.dto.RegisterUserDto;
import com.realestate.server.auth.dto.RegisterUserResponseDto;
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
    @Operation(summary = "Register a new user", description = "Creates a new user account with the provided details.")
    public BaseResponseDto<RegisterUserResponseDto> register(@Valid @RequestBody RegisterUserDto registerUserDto) {
        RegisterUserResponseDto createdUser = authService.registerUser(registerUserDto);

        return new BaseResponseDto<>(true, "User Registered Successully", createdUser);
    }

    @PostMapping("login")
    @Operation(summary = "Login user", description = "Validates user credentials and logs in the user.")
    public BaseResponseDto<RegisterUserResponseDto> login(@Valid @RequestBody LoginUserDto loginUserDto) {
        RegisterUserResponseDto userDetails = authService.validateUser(loginUserDto);

        return new BaseResponseDto<>(true, "User logged in successfully", userDetails);
    }
}
