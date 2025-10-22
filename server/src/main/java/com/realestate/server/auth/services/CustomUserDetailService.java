package com.realestate.server.auth.services;

import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.dto.AuthenticatedUserDto;
import com.realestate.server.auth.enums.RoleType;
import com.realestate.server.auth.utils.CustomUserDetails;
import com.realestate.server.manager.dto.ManagerIdPasswordDto;
import com.realestate.server.manager.repositories.ManagerRepository;
import com.realestate.server.tenant.dto.TenantIdPasswordDto;
import com.realestate.server.tenant.repositories.TenantRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    private final TenantRepository tenantRepository;
    private final ManagerRepository managerRepository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        throw new UsernameNotFoundException("Not supported. Use loadByUserIdAndRole(UUID, String).");
    }

    public UserDetails loadByUserIdAndRole(UUID userId, String role) {
        if ("TENANT".equals(role)) {

            TenantIdPasswordDto tenant = tenantRepository.findIdAndPasswordById(userId);

            if (Objects.isNull(tenant))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given tenant with this id is not registered");

            AuthenticatedUserDto authenticatedTenant = AuthenticatedUserDto.builder()
                    .id(tenant.getId())
                    .password(tenant.getPassword())
                    .role(RoleType.TENANT)
                    .build();

            return new CustomUserDetails(authenticatedTenant);

        } else if ("MANAGER".equals(role)) {

            ManagerIdPasswordDto manager = managerRepository.findIdAndPasswordById(userId);

            if (Objects.isNull(manager))
                throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No such user found");

            AuthenticatedUserDto authenticatedManager = AuthenticatedUserDto.builder()
                    .id(manager.getId())
                    .password(manager.getPassword())
                    .role(RoleType.MANAGER)
                    .build();

            return new CustomUserDetails(authenticatedManager);

        } else {
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Invalid role type");
        }
    }
}
