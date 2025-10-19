package com.realestate.server.manager;

import java.util.UUID;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.realestate.server.auth.guards.AuthenticatedManager;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerPublicDto;

import lombok.RequiredArgsConstructor;

@Controller
@RequiredArgsConstructor
public class ManagerResolver {

    private final ManagerService managerService;
    private final ManagerMapper managerMapper;

    @QueryMapping
    public ManagerPublicDto getManager(@Argument UUID id) {

        ManagerDto manager = managerService.findById(id);

        return managerMapper.toPublicDto(manager);
    }

    @AuthenticatedManager
    @QueryMapping
    public ManagerPublicDto getAuthenticatedManager() {

        String id = SecurityContextHolder.getContext().getAuthentication().getName();

        ManagerDto manager = managerService.findById(UUID.fromString(id));

        return managerMapper.toPublicDto(manager);

    }

}
