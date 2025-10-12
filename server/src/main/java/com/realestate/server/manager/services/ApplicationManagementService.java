package com.realestate.server.manager.services;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.realestate.server.manager.dto.application.ProcessApplicationDto;
import com.realestate.server.property.dto.ApplicationDto;
import com.realestate.server.property.entities.PropertyTenantPaymentApplication;
import com.realestate.server.property.repositories.PropertyTenantPaymentApplicationRepository;
import com.realestate.server.tenant.entites.Application;
import com.realestate.server.tenant.entites.Lease;
import com.realestate.server.tenant.mappers.ApplicationMapper;
import com.realestate.server.tenant.repositories.ApplicationRepository;
import com.realestate.server.tenant.services.ApplicationService;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ApplicationManagementService {

    private final ApplicationService applicationService;
    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    private final PropertyTenantPaymentApplicationRepository propertyTenantPaymentApplicationRepository;

    public List<ApplicationDto> getApplicationsForProperty(UUID propertyId) {
        List<Application> applications = applicationService.getAllPropertyApplications(propertyId);

        return applications.stream().map(applicationMapper::toDto).toList();
    }

    @Transactional
    public ApplicationDto approveApplication(UUID applicationId, ProcessApplicationDto processApplicationDto) {

        Application application = applicationService.getApplicationById(applicationId);

        application.setStatus(processApplicationDto.getApplicationStatus());

        Lease newLease = Lease.builder()
                        .application(application)
                        .startDate(LocalDateTime.now())
                        .endDate(LocalDateTime.now().plusYears(1))
                        .rent(application.getProperty().getPricePerMonth())
                        .deposit(application.getProperty().getSecurityDeposit())
                        .build();

        application.setLease(newLease);

        PropertyTenantPaymentApplication pta = PropertyTenantPaymentApplication.builder()
                                              .application(application)
                                              .property(application.getProperty())
                                              .tenant(application.getTenant())
                                              .build();
        
            propertyTenantPaymentApplicationRepository.save(pta);

            Application savedApplication = applicationRepository.save(application);

            return applicationMapper.toDto(savedApplication);
    }

}
