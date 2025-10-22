package com.realestate.server.manager;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.dataloader.DataLoader;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.MutationMapping;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;

import com.realestate.server.application.ApplicationService;
import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.application.dto.RespondToApplicationDto;
import com.realestate.server.auth.guards.AuthenticatedManager;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerPublicDto;
import com.realestate.server.property.dto.property.PropertyDto;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class ManagerResolver {

    private final ManagerService managerService;
    private final ManagerMapper managerMapper;

    private final ApplicationService applicationService;

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

    @AuthenticatedManager
    @MutationMapping
    public ApplicationDto respondToApplication(@Argument("input") RespondToApplicationDto respondToApplicationDto) {

        String managerId = SecurityContextHolder.getContext().getAuthentication().getName();

        return applicationService.respondToApplication(UUID.fromString(managerId), respondToApplicationDto);

    }

    @SchemaMapping(typeName = "Manager", field = "managedProperties")
    public CompletableFuture<List<PropertyDto>> getProperties(ManagerPublicDto managerPublicDto,
            DataLoader<UUID, PropertyDto> dataLoader) {

        Set<UUID> ids = managerPublicDto.getManagedPropertyIds();

        return dataLoader.loadMany(new ArrayList<>(ids));

    }

}
