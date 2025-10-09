package com.realestate.server.property.repositories;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.realestate.server.property.entities.PropertyTenantPaymentApplication;

@Repository
public interface PropertyTenantPaymentApplicationRepository extends JpaRepository<PropertyTenantPaymentApplication, Integer> {
	
}
