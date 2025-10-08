package com.realestate.server.auth.services;

import java.util.Date;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.AuthMapper;
import com.realestate.server.auth.dto.AuthTenantResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.LoginTenantDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterTenantDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.auth.enums.Role;
import com.realestate.server.auth.repositories.BlackListRefreshTokenRepository;
import com.realestate.server.auth.utils.JwtService;
import com.realestate.server.auth.utils.TokenType;
import com.realestate.server.tenant.TenantService;
import com.realestate.server.tenant.dto.tenant.TenantDto;
import com.realestate.server.tenant.dto.tenant.TenantSummaryDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthTenantService {
    
    private final TenantService tenantService;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final BlackListRefreshTokenRepository blackListRefreshTokenRepository;
    private final UserDetailsService userDetailsService;

      public AuthTenantResponseDto registerTenant(RegisterTenantDto registerTenantDto) {
        TenantDto existingTenant = tenantService.findByEmail(registerTenantDto.getEmail());

        if (!Objects.isNull(existingTenant))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Tenant with this email is already registered with us");

        String hashedPassword = passwordEncoder.encode(registerTenantDto.getPassword());

        registerTenantDto.setPassword(hashedPassword);

        TenantSummaryDto createdTenant = tenantService.createTenantAccount(registerTenantDto);

        TokensDto tokensDto = jwtService.generateTokens(createdTenant.getId().toString(), Role.TENANT);


        return authMapper.toAuthenticatedTenantResponseDto(createdTenant, tokensDto);
    }

    public AuthTenantResponseDto validateTenant(LoginTenantDto loginTenantDto) {
        TenantDto existingTenant = tenantService.findByEmail(loginTenantDto.getEmail());

        if (Objects.isNull(existingTenant))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given user with this email does not exist");

        boolean isValidPassword = passwordEncoder.matches(loginTenantDto.getPassword(), existingTenant.getPassword());

        if (!isValidPassword)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Either entered email or password is wrong");

        TenantSummaryDto tenant = authMapper.toTenantResponseDto(existingTenant);

        TokensDto tokensDto = jwtService.generateTokens(existingTenant.getId().toString(), Role.TENANT);

        return authMapper.toAuthenticatedTenantResponseDto(tenant, tokensDto);
    }

    
    private void insertBlackListedToken(BlackListRefreshTokenDto blackListRefreshTokenDto) {
        BlackListRefreshTokenEntity entity = authMapper.insertBlackListedToken(blackListRefreshTokenDto);
        blackListRefreshTokenRepository.save(entity);
    }

    private boolean isRefreshTokenBlackListed(String refreshToken) {
        return blackListRefreshTokenRepository.findByRefreshToken(refreshToken).isPresent();
    }

    public TokensDto regenerateTokens(RefreshTokensDto refreshTokensDto, Role role) {

        String userId = jwtService.extractUserId(refreshTokensDto.getRefreshToken(), TokenType.REFRESH);

        UserDetails userDetails = userDetailsService.loadUserByUsername(userId);

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


}
