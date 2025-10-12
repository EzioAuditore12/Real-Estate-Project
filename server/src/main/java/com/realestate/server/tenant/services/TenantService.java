package com.realestate.server.tenant.services;

import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.tenant.dto.tenant.CreateTenantDto;
import com.realestate.server.tenant.dto.tenant.TenantDto;
import com.realestate.server.tenant.dto.tenant.TenantSummaryDto;
import com.realestate.server.tenant.entites.Tenant;
import com.realestate.server.tenant.mappers.TenantMapper;
import com.realestate.server.tenant.repositories.TenantRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class TenantService {
    
    private final TenantRepository tenantRepository;
    private final TenantMapper tenantMapper;
    private final CloudinaryService cloudinaryService;

    public TenantDto findByEmail(String email) {
        return tenantRepository.findByEmail(email).map(tenantMapper::toDto).orElse(null);
    }

    @Transactional
    public TenantDto findByUserId(UUID userId) {
        return tenantRepository.findById(userId).map(tenantMapper::toDto).orElse(null);
    }

    public TenantSummaryDto createTenantAccount(CreateTenantDto createTenantDto) {

        Tenant tenant = tenantMapper.toCreateEntity(createTenantDto);

        if(Objects.nonNull(createTenantDto.getAvatar())){
            String uploadedAvatarUrl = cloudinaryService.uploadFile(createTenantDto.getAvatar());   
             tenant.setAvatar(uploadedAvatarUrl);
        }

        Tenant createdAccount = tenantRepository.save(tenant);

        return tenantMapper.toSummaryDto(createdAccount);
    }

    public Tenant findEntityById(UUID userId) {
        return tenantRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));
    }
    
}
