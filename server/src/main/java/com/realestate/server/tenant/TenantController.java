package com.realestate.server.tenant;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.common.dto.BaseResponseDto;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tenant")
@RequiredArgsConstructor
@Tag(name = "Tenant")
public class TenantController {
    
    @GetMapping
    public BaseResponseDto<String> helloTenant(){
        return new BaseResponseDto<>(true,"User Verified successfully",SecurityContextHolder.getContext().getAuthentication().getName());
    } 
}
