package com.realestate.server.application;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.application.dto.CreateApplicationDto;
import com.realestate.server.application.entities.Application;
import com.realestate.server.application.repositories.ApplicationRepository;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.repositories.PropertyRepository;
import com.realestate.server.tenant.entities.Tenant;
import com.realestate.server.tenant.repositories.TenantRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class ApplicationService {

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    private final TenantRepository tenantRepository;
    private final PropertyRepository propertyRepository;

    public ApplicationDto createApplication(UUID tenantId, CreateApplicationDto createApplicationDto) {

        Tenant tenant = tenantRepository.findById(tenantId).orElseThrow(
                () -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No such tenant found"));

        boolean existingApplication = applicationRepository.existsByTenantIdAndPropertyId(tenantId,
                createApplicationDto.getPropertyId());

        if (existingApplication)
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "Application for this property for this use already exists");

        Property property = propertyRepository
                .findById(createApplicationDto.getPropertyId())
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "No Such property found"));

        Application application = Application.builder()
                .tenant(tenant)
                .property(property)
                .startDate(LocalDateTime.now())
                .build();

        Application savedApplication = applicationRepository.save(application);

        return applicationMapper.toDto(savedApplication);

    }

    public Flux<ApplicationDto> findApplicationWithIds(List<UUID> ids) {

        List<Application> applications = applicationRepository.findAllById(ids);

        return Flux.fromIterable(
                applications.stream().map(applicationMapper::toDto).toList());

    }

}
