package com.realestate.server.property;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
import java.util.Set;
import java.util.UUID;
import java.util.concurrent.CompletableFuture;

import org.dataloader.DataLoader;
import org.springframework.data.domain.Page;
import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.graphql.data.method.annotation.SchemaMapping;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Controller;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.application.dto.ApplicationDto;
import com.realestate.server.common.dto.PaginationDto;
import com.realestate.server.manager.ManagerService;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertyPageDto;
import com.realestate.server.property.dto.property.PropertySearchDto;
import com.realestate.server.property.services.PropertyService;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Controller
@RequiredArgsConstructor
@Slf4j
public class PropertyResolver {

    private final PropertyService propertyService;

    private final ManagerService managerService;

    @QueryMapping
    public PropertyDto getProperty(@Argument UUID id) {

        PropertyDto property = propertyService.getPropertyDetails(id);

        if (Objects.isNull(property))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "No Such proeprty found");

        return property;
    }

    @QueryMapping
    public PropertyPageDto getProperties(
            @Argument PropertySearchDto search,
            @Argument Integer page,
            @Argument Integer size) {

        Page<PropertyDto> propertyPage = propertyService.getAllPropertiesBySearch(search, page, size);

        PaginationDto paginationDto = PaginationDto.builder()
                .currentPage(propertyPage.getNumber())
                .totalPages(propertyPage.getTotalPages())
                .totalElements((int) propertyPage.getTotalElements())
                .size(propertyPage.getSize())
                .build();

        return PropertyPageDto.builder()
                .content(propertyPage.getContent())
                .pagination(paginationDto)
                .build();
    }

    @SchemaMapping(typeName = "Property", field = "manager") 
    public ManagerDto getManager(PropertyDto propertyDto) {

        UUID managerId = propertyDto.getManagerId();

        return managerService.findById(managerId);

    }

    @SchemaMapping(typeName = "Property", field = "applications")
    public CompletableFuture<List<ApplicationDto>> getProperties(PropertyDto propertyDto,
            DataLoader<UUID, ApplicationDto> dataLoader) {

        Set<UUID> ids = propertyDto.getApplicationIds();

        return dataLoader.loadMany(new ArrayList<>(ids));

    }

}
