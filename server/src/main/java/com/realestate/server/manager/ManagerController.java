package com.realestate.server.manager;

import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("manager")
@RequiredArgsConstructor
public class ManagerController {
    
    @GetMapping
    public String helloManager(){
        return SecurityContextHolder.getContext().getAuthentication().getName();
    }
}
