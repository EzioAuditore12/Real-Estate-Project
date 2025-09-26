package com.realestate.server.auth;

import java.util.Date;
import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.LoginUserDto;
import com.realestate.server.auth.dto.RefreshTokensDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.dto.RegisterUserDto;
import com.realestate.server.auth.repositories.BlackListRefreshTokenRepository;
import com.realestate.server.auth.utils.JwtService;
import com.realestate.server.auth.utils.TokenType;
import com.realestate.server.user.UserService;
import com.realestate.server.user.dto.UserDto;
import com.realestate.server.user.dto.UserResponseDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;
    private final BlackListRefreshTokenRepository blackListRefreshTokenRepository;
    private final UserDetailsService userDetailsService;

    public AuthResponseDto registerUser(RegisterUserDto registerUserDto) {
        UserDto existingUser = userService.findByEmail(registerUserDto.getEmail());

        if (!Objects.isNull(existingUser))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User with this email is already registered with us");

        String hashedPassword = passwordEncoder.encode(registerUserDto.getPassword());

        registerUserDto.setPassword(hashedPassword);

        UserDto createdUser = userService.createUser(registerUserDto);

        TokensDto tokensDto = jwtService.generateTokens(createdUser.getId());

        UserResponseDto userResponseDto = authMapper.toUserResponseDto(createdUser);

        return authMapper.toAuthenticatedUserResponseDto(userResponseDto,tokensDto);
    }

    public AuthResponseDto validateUser(LoginUserDto loginUserDto) {
        UserDto existingUser = userService.findByEmail(loginUserDto.getEmail());

        if (Objects.isNull(existingUser))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given user with this email does not exist");

        boolean isValidPassword = passwordEncoder.matches(loginUserDto.getPasssword(), existingUser.getPassword());

        if (!isValidPassword)
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Eithere entered email or password is wrong");

        UserResponseDto userResponseDto = authMapper.toUserResponseDto(existingUser);

        TokensDto tokensDto = jwtService.generateTokens(existingUser.getId());

        return authMapper.toAuthenticatedUserResponseDto(userResponseDto, tokensDto);
    }

    private void insertBlackListedToken(BlackListRefreshTokenDto blackListRefreshTokenDto) {
        BlackListRefreshTokenEntity entity = authMapper.insertBlackListedToken(blackListRefreshTokenDto);
        blackListRefreshTokenRepository.save(entity);
    }

    private boolean isRefreshTokenBlackListed(String refreshToken) {
        return blackListRefreshTokenRepository.findByRefreshToken(refreshToken).isPresent();
    }

    public TokensDto regenerateTokens(RefreshTokensDto refreshTokensDto) {

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

        return jwtService.generateTokens(userId);
    }

}
