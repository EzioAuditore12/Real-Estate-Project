package com.realestate.server.auth.entities;

import java.time.Instant;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Data;

@Entity
@Data
public class BlackListRefreshTokenEntity {
    
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    @Column(columnDefinition = "uuid", updatable = false, nullable = false )
    private String id;

    @Column(columnDefinition = "text", nullable = false, unique = true)
    private String refreshToken;

    @Column(nullable = false)
    private Instant iat;

    @Column(nullable = false)
    private Instant exp;
}
