package com.realestate.server.auth.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;

public interface BlackListRefreshTokenRepository extends JpaRepository<BlackListRefreshTokenEntity, UUID> {
    Optional<BlackListRefreshTokenEntity> findByRefreshToken(String refreshToken);
}
