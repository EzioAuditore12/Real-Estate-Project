package com.realestate.server.tenant;

import java.util.Objects;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.tenant.dto.CreateTenantDto;
import com.realestate.server.tenant.dto.TenantDto;
import com.realestate.server.tenant.entites.Tenant;
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

    public TenantDto createTenantAccount(CreateTenantDto createTenantDto) {

        Tenant tenant = tenantMapper.fromCreateDto(createTenantDto);

        if(Objects.nonNull(createTenantDto.getAvatar())){
            String uploadedAvatarUrl = cloudinaryService.uploadFile(createTenantDto.getAvatar());   
             tenant.setAvatar(uploadedAvatarUrl);
        }

        Tenant createdAccount = tenantRepository.save(tenant);

        return tenantMapper.toDto(createdAccount);
    }
    
}
