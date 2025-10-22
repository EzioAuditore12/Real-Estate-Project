package com.realestate.server.tenant;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.realestate.server.application.ApplicationMapper;
import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.application.entities.Application;
import com.realestate.server.application.repositories.ApplicationRepository;
import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.tenant.dto.CreateTenantDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.entities.Tenant;
import com.realestate.server.tenant.repositories.TenantRepository;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Service
@RequiredArgsConstructor
@Slf4j
public class TenantService {

    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;
    private final CloudinaryService cloudinaryService;

    private final ApplicationRepository applicationRepository;
    private final ApplicationMapper applicationMapper;

    public TenantDto findById(UUID id) {
        return tenantRepository.findById(id).map(tenantMapper::toDto).orElse(null);
    }

    public TenantDto findByEmail(String email) {

        return tenantRepository.findByEmail(email).map(tenantMapper::toDto)
                .orElse(null);

    }

    public TenantDto createAccount(CreateTenantDto createTenantDto) {

        Tenant tenant = tenantMapper.fromCreateDto(createTenantDto);

        if (Objects.nonNull(createTenantDto.getAvatar())) {
            String uploadedAvatarUrl = cloudinaryService.uploadFile(createTenantDto.getAvatar());
            tenant.setAvatar(uploadedAvatarUrl);
        }

        Tenant createdAccount = tenantRepository.save(tenant);

        return tenantMapper.toDto(createdAccount);

    }

    public List<ApplicationDto> createdApplications(UUID tenantId) {
        
        List<Application> applications = applicationRepository.findByTenantId(tenantId);

        log.info("applications: {}", applications);

        return applications.stream().map(applicationMapper::toDto).toList();
    }

}
