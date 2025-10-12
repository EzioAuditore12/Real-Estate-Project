package com.realestate.server.tenant.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.property.dto.ApplicationDto;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.services.PropertyService;
import com.realestate.server.tenant.dto.application.CreateApplicationDto;
import com.realestate.server.tenant.entites.Application;
import com.realestate.server.tenant.entites.Tenant;
import com.realestate.server.tenant.mappers.ApplicationMapper;
import com.realestate.server.tenant.repositories.ApplicationRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationService {
   
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    private final TenantService tenantService;
    private final PropertyService propertyService;

    @Transactional
    public  ApplicationDto createApplication(UUID tenantId, CreateApplicationDto createApplicationDto) {

        Tenant tenant = tenantService.findEntityById(tenantId);

        boolean existingApplication = applicationRepository.existsByTenantIdAndPropertyId(tenantId, createApplicationDto.getPropertyId());

        if(existingApplication)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Application for this property for this use already exists");

        Property property = propertyService.findPropertyByEntity(createApplicationDto.getPropertyId());

        Application application = Application.builder()
            .tenant(tenant)
            .property(property)
            .startDate(LocalDateTime.now())
            .build();

        Application savedApplication = applicationRepository.save(application);

        return applicationMapper.toDto(savedApplication);

    }

    public Application getApplicationById(UUID applicationId) {
        return applicationRepository.findById(applicationId).orElseThrow(
            () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such application found")
        );
    }

    public List<Application> getAllPropertyApplications(UUID propertyId) {

        return applicationRepository.findByPropertyId(propertyId);

    }

}
