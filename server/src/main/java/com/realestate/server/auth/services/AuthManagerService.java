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
import com.realestate.server.auth.dto.AuthManagerResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.LoginManagerDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.RegisterManagerDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.auth.enums.Role;
import com.realestate.server.auth.repositories.BlackListRefreshTokenRepository;
import com.realestate.server.auth.utils.JwtService;
import com.realestate.server.auth.utils.TokenType;
import com.realestate.server.manager.ManagerService;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerResponseDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthManagerService {
    
    private final ManagerService managerService;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final BlackListRefreshTokenRepository blackListRefreshTokenRepository;
    private final UserDetailsService userDetailsService;

    
    public AuthManagerResponseDto registerManager(RegisterManagerDto registerManagerDto) {
        var existingManager = managerService.findByEmail(registerManagerDto.getEmail());

        if (!Objects.isNull(existingManager))
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Manager with this email is already registered");

        String hashedPassword = passwordEncoder.encode(registerManagerDto.getPassword());

        registerManagerDto.setPassword(hashedPassword);

        ManagerDto createdManager = managerService.createManagerAccount(registerManagerDto);

        TokensDto tokens = jwtService.generateTokens(createdManager.getId().toString(), Role.MANAGER);

        ManagerResponseDto managerResponseDto = authMapper.toManagerResponseDto(createdManager);

        return authMapper.toAuthenticatedManagerResponseDto(managerResponseDto, tokens);
    }

    public AuthManagerResponseDto validateManager(LoginManagerDto loginManagerDto) {
        ManagerDto existingManager = managerService.findByEmail(loginManagerDto.getEmail());

        if (Objects.isNull(existingManager))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given user with this email does not exist");

        boolean isValidPassword = passwordEncoder.matches(loginManagerDto.getPassword(), existingManager.getPassword());

        if (!isValidPassword)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Either entered email or password is wrong");

        ManagerResponseDto managerResponseDto = authMapper.toManagerResponseDto(existingManager);

        TokensDto tokensDto = jwtService.generateTokens(existingManager.getId().toString(), Role.MANAGER);

        return authMapper.toAuthenticatedManagerResponseDto(managerResponseDto, tokensDto);
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
