package com.realestate.server.auth.utils;

import java.util.UUID;

import org.springframework.security.core.context.SecurityContextHolder;

public class AuthUtils {

    private AuthUtils() {
    }

    public static UUID getAuthenticatedUserId() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        return UUID.fromString(userId);
    }

}
