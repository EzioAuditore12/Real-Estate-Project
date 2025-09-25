package com.realestate.server.user;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("user")
public class UserController {
    
    @GetMapping
    public String hello(){
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();
        return "Hello " + userId;
    }
}
