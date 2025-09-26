package com.realestate.server.auth.entities;

import java.util.Date;
import java.util.UUID;

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
    private UUID id;

    @Column(columnDefinition = "text", nullable = false, unique = true)
    private String refreshToken;

    @Column(nullable = false)
    private Date iat;

    @Column(nullable = false)
    private Date exp;
}
