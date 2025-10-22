package com.realestate.server.property.repositories;

import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.property.entities.PropertyTenantPaymentApplication;

public interface PropertyTenantPaymentApplicationRepository
                extends JpaRepository<PropertyTenantPaymentApplication, Long> {

        boolean existsByApplication_Id(UUID applicationId);

}
