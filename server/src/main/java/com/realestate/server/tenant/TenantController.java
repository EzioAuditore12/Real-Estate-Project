package com.realestate.server.tenant;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.common.dto.BaseResponseDto;
import com.realestate.server.tenant.dto.TenantResponseDto;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tenant")
@RequiredArgsConstructor
@Tag(name = "Tenant")
public class TenantController {

    private final TenantService tenantService;
    private final TenantMapper tenantMapper;
    
    @GetMapping
    public BaseResponseDto<TenantResponseDto> helloTenant(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
 
       var tenant = tenantService.findByUserId(UUID.fromString(userId));  

        return new BaseResponseDto<>(true,"User Verified successfully",tenantMapper.toResponseDto(tenant));
    } 
}
