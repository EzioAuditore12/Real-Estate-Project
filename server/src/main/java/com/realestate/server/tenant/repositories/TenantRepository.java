package com.realestate.server.tenant.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.tenant.entites.Tenant;

public interface TenantRepository extends JpaRepository<Tenant, UUID> {
    Optional<Tenant> findByEmail(String email);

    @EntityGraph(attributePaths = "applications")
    Optional<Tenant> findWithApplicationsById(UUID id);

    @EntityGraph(attributePaths = "payments")
    Optional<Tenant> findWithPaymentsById(UUID id);

}
