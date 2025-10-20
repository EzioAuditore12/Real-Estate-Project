package com.realestate.server.property.repositories;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.property.entities.PropertyTenantPaymentApplication;

public interface PropertyTenantPaymentApplicationRepository
        extends JpaRepository<PropertyTenantPaymentApplication, Long> {

}
