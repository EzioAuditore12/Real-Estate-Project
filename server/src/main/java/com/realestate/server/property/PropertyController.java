package com.realestate.server.property;

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

import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("property")
@RequiredArgsConstructor
@Tag(name = "Property")
public class PropertyController {

    private final PropertyService propertyService;

    @AuthenticatedManager
    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public BaseResponseDto<PropertyDto> createProperty(@Valid @ModelAttribute CreatePropertyDto createPropertyDto) {

        String managerId = SecurityContextHolder.getContext().getAuthentication().getName();

        try {
            PropertyDto createdProperty = propertyService.initializeProperty(UUID.fromString(managerId),
                    createPropertyDto);
            return new BaseResponseDto<>(true, "Property Created Successfully", createdProperty);
        } catch (Exception e) {
            e.printStackTrace(); // Add this to see the actual error
            throw e;
        }
    }

}
