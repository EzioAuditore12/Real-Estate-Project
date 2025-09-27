package com.realestate.server.auth.utils;

import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.tenant.TenantService;
import com.realestate.server.tenant.dto.TenantDto; 

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final TenantService tenantService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        TenantDto tenant = tenantService.findByUserId(UUID.fromString(username)); 

        if (Objects.isNull(tenant)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with this email is not registed with us");
        }

        return new CustomUserDetails(tenant);
    }
}
