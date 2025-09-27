package com.realestate.server.tenant;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("tenant")
@RequiredArgsConstructor
public class TenantController {
    
    @GetMapping
    public String helloTenant(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
