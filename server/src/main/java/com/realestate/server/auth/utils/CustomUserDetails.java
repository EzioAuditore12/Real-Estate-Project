package com.realestate.server.auth.utils;

import java.util.Collection;
import java.util.Collections;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import com.realestate.server.auth.enums.Role;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.tenant.dto.TenantDto;

public class CustomUserDetails implements UserDetails{
    
    private final transient TenantDto tenant;
    private final transient ManagerDto manager;
    private final Role role;

     public CustomUserDetails(TenantDto tenant) {
        this.tenant = tenant;
        this.manager = null;
        this.role = Role.TENANT;
    }
    
    public CustomUserDetails(ManagerDto manager) {
        this.tenant = null;
        this.manager = manager;
        this.role = Role.MANAGER;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return Collections.singleton(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword() {
        if (role == Role.MANAGER && manager != null) {
            return manager.getPassword();
        } else if (role == Role.TENANT && tenant != null) {
            return tenant.getPassword();
        }
        return null;
    }

    @Override
    public String getUsername() {
        if (role == Role.MANAGER && manager != null) {
            return manager.getId().toString();
        } else if (role == Role.TENANT && tenant != null) {
            return tenant.getId().toString();
        }
        return null;
    }

    
}
