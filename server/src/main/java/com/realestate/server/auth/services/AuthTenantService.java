package com.realestate.server.auth.services;

import java.util.Date;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.AuthMapper;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.RefershTokensDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.dto.login.LoginTenantDto;
import com.realestate.server.auth.dto.register.RegisterTenantDto;
import com.realestate.server.auth.dto.responses.AuthTenantReponseDto;
import com.realestate.server.auth.entities.BlackListRefreshToken;
import com.realestate.server.auth.enums.RoleType;
import com.realestate.server.auth.enums.TokenType;
import com.realestate.server.auth.repositories.BlackListRefreshTokenRepository;
import com.realestate.server.tenant.TenantMapper;
import com.realestate.server.tenant.TenantService;
import com.realestate.server.tenant.dto.TenantDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthTenantService {

    private final AuthMapper authMapper;
    private final TenantService tenantService;
    private final TenantMapper tenantMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final BlackListRefreshTokenRepository blackListRefreshTokenRepository;
    private final CustomUserDetailService userDetailService;

    public AuthTenantReponseDto registerTenant(RegisterTenantDto registerTenantDto) {
        TenantDto existingTenant = tenantService.findByEmail(registerTenantDto.getEmail());

        if (!Objects.isNull(existingTenant))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Tenant with this email is already registered");

        String hashedPassword = passwordEncoder.encode(registerTenantDto.getPassword());

        registerTenantDto.setPassword(hashedPassword);

        TenantDto createdTenant = tenantService.createAccount(registerTenantDto);

        TokensDto tokens = jwtService.generateTokens(createdTenant.getId().toString(), RoleType.TENANT);

        return AuthTenantReponseDto.builder().user(tenantMapper.toPublicDto(createdTenant)).tokens(tokens).build();
    }

     public AuthTenantReponseDto validateTenant(LoginTenantDto loginTenantDto) {
        TenantDto existingTenant = tenantService.findByEmail(loginTenantDto.getEmail());

        if (Objects.isNull(existingTenant))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given user with this email does not exist");

        boolean isValidPassword = passwordEncoder.matches(loginTenantDto.getPassword(), existingTenant.getPassword());

        if (!isValidPassword)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Either entered email or password is wrong");

        TokensDto tokens = jwtService.generateTokens(existingTenant.getId().toString(), RoleType.TENANT);

        return AuthTenantReponseDto.builder().user(tenantMapper.toPublicDto(existingTenant)).tokens(tokens).build();
    }

    public TokensDto regenerateTokens(RefershTokensDto refreshTokensDto, RoleType role) {
        String userId = jwtService.extractUserId(refreshTokensDto.getRefreshToken(), TokenType.REFRESH);

        UserDetails userDetails = userDetailService.loadByUserIdAndRole(UUID.fromString(userId), "TENANT" );

        boolean isTokenValid = jwtService.isTokenValid(refreshTokensDto.getRefreshToken(), userDetails,
                TokenType.REFRESH);

        if (!isTokenValid)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED,
                    "Given refresh token is either invalid or expired");

        if (isRefreshTokenBlackListed(refreshTokensDto.getRefreshToken()))
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Given refresh token is blacklisted");

        Date iat = jwtService.extractIssuedAt(refreshTokensDto.getRefreshToken(), TokenType.REFRESH);
        Date exp = jwtService.extractExpiration(refreshTokensDto.getRefreshToken(), TokenType.REFRESH);

        BlackListRefreshTokenDto blackListRefreshTokenDto = new BlackListRefreshTokenDto(
                refreshTokensDto.getRefreshToken(), iat, exp);
        insertBlackListedToken(blackListRefreshTokenDto);

        return jwtService.generateTokens(userId, role);
    }

    private void insertBlackListedToken(BlackListRefreshTokenDto blackListRefreshTokenDto) {
        BlackListRefreshToken entity = authMapper.insertBlackListedToken(blackListRefreshTokenDto);
        blackListRefreshTokenRepository.save(entity);
    }

    private boolean isRefreshTokenBlackListed(String refreshToken) {
        return blackListRefreshTokenRepository.findByRefreshToken(refreshToken).isPresent();
    }
}
