package com.realestate.server.manager;

import java.util.UUID;

import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.guards.AuthenticatedManager;
import com.realestate.server.common.dto.BaseResponseDto;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.services.PropertyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("manager")
@RequiredArgsConstructor
@Tag(name = "Manager")
public class ManagerController {

    private final PropertyService propertyService;

    @AuthenticatedManager
    @PostMapping(path = "create-property", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @Operation(summary = "Initialize a property", description = "Allows a authenticated manager to create a property")
    public BaseResponseDto<PropertyDto> createProperty(@Valid @ModelAttribute CreatePropertyDto createPropertyDto) {

        String managerId = SecurityContextHolder.getContext().getAuthentication().getName();

        PropertyDto createdProperty = propertyService.initializeProperty(UUID.fromString(managerId), createPropertyDto);

        return new BaseResponseDto<>(true, "Property Created Successfully", createdProperty);

    }

}
