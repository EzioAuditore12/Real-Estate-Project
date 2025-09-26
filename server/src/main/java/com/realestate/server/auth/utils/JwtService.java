package com.realestate.server.auth.utils;

import java.time.Duration;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;
import java.util.function.Function;

import javax.crypto.SecretKey;

import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import com.realestate.server.auth.dto.TokensDto;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class JwtService {

    private String jwtSecretKey = "5d0d5848382a38380e5087061b33d1bd3739deb88c57056f1eb8e26394036419";
    private long jwtExpirationTime = Duration.ofMinutes(2).toMillis();
    private String refreshJwtSecretKey = "b5ad0bab615d627d901ae565359291f21e25276dcf9fa3b7b11a9ce7e19ad11a";
    private long refreshJwtExpirationTime = Duration.ofMinutes(10).toMillis();

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

    public String generateToken(String userId, TokenType tokenType) {
        long expirationTime;

        if (tokenType == TokenType.ACCESS) {
            expirationTime = jwtExpirationTime;
        } else {
            expirationTime = refreshJwtExpirationTime;
        }

        Map<String, Object> claims = new HashMap<>();
        claims.put("type", tokenType.name());

        return Jwts.builder()
                .claims().add(claims)
                .subject(userId).issuer("DCB")
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + expirationTime))
                .and().signWith(generateKey(tokenType)).compact();
    }

    public TokensDto generateTokens(String payload) {
        String accessToken = generateAccessToken(payload);
        String refreshToken = generateRefreshToken(payload);

        return new TokensDto(accessToken, refreshToken);
    }

    public String generateAccessToken(String payload) {
        return generateToken(payload, TokenType.ACCESS);
    }

    public String generateRefreshToken(String payload) {
        return generateToken(payload, TokenType.REFRESH);
    }

    public String extractUserId(String token, TokenType tokenType) {
        return extractClaims(token, Claims::getSubject, tokenType);
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
