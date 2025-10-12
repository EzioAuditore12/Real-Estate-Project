package com.realestate.server.tenant.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.tenant.entites.Application;

public interface ApplicationRepository extends JpaRepository<Application, UUID> {

    boolean existsByTenantIdAndPropertyId(UUID tenantId, UUID propertyId);
}
