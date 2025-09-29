package com.realestate.server.auth.utils;

import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.manager.ManagerService;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.tenant.TenantService;
import com.realestate.server.tenant.dto.TenantDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {

    private final TenantService tenantService;
    private final ManagerService managerService;

    public UserDetails loadUserByUserIdAndRole(UUID userId, String role) {
        if ("TENANT".equals(role)) {
            TenantDto tenant = tenantService.findByUserId(userId);
            if (!Objects.isNull(tenant)) {
                return new CustomUserDetails(tenant);
            }
        } else if ("MANAGER".equals(role)) {
            ManagerDto manager = managerService.findById(userId);
            if (!Objects.isNull(manager)) {
                return new CustomUserDetails(manager);
            }
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with this ID is not registered with us");
    }


    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UUID userId = UUID.fromString(username);

        // Try to find as tenant first
        TenantDto tenant = tenantService.findByUserId(userId);
        if (!Objects.isNull(tenant)) {
            return new CustomUserDetails(tenant);
        }

        // Try to find as manager
        ManagerDto manager = managerService.findById(userId);
        if (!Objects.isNull(manager)) {
            return new CustomUserDetails(manager);
        }

        throw new ResponseStatusException(HttpStatus.NOT_FOUND, "User with this ID is not registered with us");
    }
}
