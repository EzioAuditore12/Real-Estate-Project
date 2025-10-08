package com.realestate.server.tenant.entites;

import java.util.List;
import java.util.UUID;

import com.realestate.server.property.entities.PropertyEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToMany;
import lombok.Data;

@Entity
@Data
public class Tenant {
   @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 240,nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "text",nullable = false)
    private String password;

    @Column(columnDefinition = "text",nullable = true)
    private String avatar;

    @ManyToMany(mappedBy = "favouritedBy")
    private List<PropertyEntity> favourites;

    @ManyToMany(mappedBy = "tenants")
    private List<PropertyEntity> properties;
}
