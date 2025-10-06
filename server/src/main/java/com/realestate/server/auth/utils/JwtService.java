package com.realestate.server.auth.utils;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import jakarta.annotation.PostConstruct;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.enums.Role;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    @Value("${jwt.secret}")
    private String jwtSecretKey;

    @Value("${refresh-jwt.secret}")
    private String refreshJwtSecretKey;

    @Value("${jwt.expiration-minutes}")
    private long jwtExpirationTime;

    @Value("${refresh-jwt.expiration-days}")
    private long refreshJwtExpirationTime;

    @PostConstruct
    public void init(){
        jwtExpirationTime =Duration.ofMinutes(jwtExpirationTime).toMillis();
        refreshJwtExpirationTime = Duration.ofDays(refreshJwtExpirationTime).toMillis();
    }


    private SecretKey generateKey(TokenType tokenType) {
        String secret;
        if (tokenType == TokenType.ACCESS) {
            secret = jwtSecretKey;
        } else {
            secret = refreshJwtSecretKey;
        }
        byte[] decode = Decoders.BASE64.decode(secret);
        return Keys.hmacShaKeyFor(decode);
    }

    public String generateToken(String userId, TokenType tokenType, Role role) {
        long expirationTime;

        if (tokenType == TokenType.ACCESS) {
            expirationTime = jwtExpirationTime;
        } else {
            expirationTime = refreshJwtExpirationTime;
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("type", tokenType.name());
        claims.put("role", role.name());

        return Jwts.builder()
                .claims().add(claims)
                .subject(userId).issuer("DCB")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .and().signWith(generateKey(tokenType)).compact();
    }

    public TokensDto generateTokens(String subject, Role role) {
        String accessToken = generateAccessToken(subject,role);
        String refreshToken = generateRefreshToken(subject,role);

        return new TokensDto(accessToken, refreshToken);
    }

    public String generateAccessToken(String payload, Role role) {
        return generateToken(payload, TokenType.ACCESS, role);
    }

    public String generateRefreshToken(String payload,Role role) {
        return generateToken(payload, TokenType.REFRESH, role);
    }

    public String extractUserId(String token, TokenType tokenType) {
        return extractClaims(token, Claims::getSubject, tokenType);
    }

    public String extractRole(String token, TokenType tokenType) {
        return extractClaims(token, claims -> claims.get("role", String.class), tokenType);
    }

    private <T> T extractClaims(String token, Function<Claims, T> claimResolver, TokenType tokenType) {
        Claims claims = extractClaims(token, tokenType);
        return claimResolver.apply(claims);
    }

    private Claims extractClaims(String token, TokenType tokenType) {
        return Jwts.parser().verifyWith(generateKey(tokenType)).build().parseSignedClaims(token).getPayload();
    }

    public boolean isTokenValid(String token, UserDetails userDetails, TokenType tokenType) {
        final String userId = extractUserId(token, tokenType);

        return (userId.equals(userDetails.getUsername()) && !isTokenExpired(token, tokenType));
    }

    private boolean isTokenExpired(String token, TokenType tokenType) {
        return extractExpiration(token, tokenType).before(new Date());
    }

    public Date extractIssuedAt(String token, TokenType tokenType) {
        return extractClaims(token, Claims::getIssuedAt, tokenType);
    }

    public Date extractExpiration(String token, TokenType tokenType) {
        return extractClaims(token, Claims::getExpiration, tokenType);
    }
}
