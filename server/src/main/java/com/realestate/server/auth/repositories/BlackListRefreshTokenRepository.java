package com.realestate.server.auth.repositories;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.auth.entities.BlackListRefreshToken;

public interface BlackListRefreshTokenRepository extends JpaRepository<BlackListRefreshToken, Long> {
    Optional<BlackListRefreshToken> findByRefreshToken(String refreshToken);
}
