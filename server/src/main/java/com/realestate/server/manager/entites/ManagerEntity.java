package com.realestate.server.manager.entites;

import java.util.List;
import java.util.UUID;

import com.realestate.server.property.entities.PropertyEntity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.OneToMany;
import lombok.Data;

@Entity
@Data
public class ManagerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.UUID)
    private UUID id;
    
    @Column(length = 50, nullable = false)
    private String name;

    @Column(length = 240,nullable = false, unique = true)
    private String email;

    @Column(columnDefinition = "text")
    private String password;

    @OneToMany(mappedBy = "managerId")
    private List<PropertyEntity> managedProperties;
}
