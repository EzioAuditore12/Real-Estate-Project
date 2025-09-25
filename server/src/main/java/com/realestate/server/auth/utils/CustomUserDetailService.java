package com.realestate.server.auth.utils;

import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.user.UserService;
import com.realestate.server.user.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Component
@RequiredArgsConstructor
public class CustomUserDetailService implements UserDetailsService {
    
    private final UserService userService;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDto user = userService.findById(username);

        if(Objects.isNull(user)) {
            throw new ResponseStatusException(HttpStatus.NOT_FOUND,"User with this email is not registed with us");
        }

        return new CustomUserDetails(user);
    }


}
