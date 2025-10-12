package com.realestate.server.property;

import java.util.List;
import java.util.UUID;

import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.realestate.server.auth.guards.AuthenticatedManager;
import com.realestate.server.common.dto.BaseListResponseDto;
import com.realestate.server.common.dto.BaseResponseDto;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertySearchDto;
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

        PropertyDto createdProperty = propertyService.initializeProperty(UUID.fromString(managerId),
                createPropertyDto);
        return new BaseResponseDto<>(true, "Property Created Successfully", createdProperty);
    }

    @AuthenticatedManager
    @GetMapping("/created")
    public BaseListResponseDto<List<PropertyDto>> getAllProperties() {

        String managerId = SecurityContextHolder.getContext().getAuthentication().getName();

        List<PropertyDto> managedPropeties = propertyService
                .getAllManagerCreatedProperties(UUID.fromString(managerId));

        return new BaseListResponseDto<>(true, "Here are all the created properties", managedPropeties);
    }

    @GetMapping
    public BaseListResponseDto<List<PropertyDto>> searchProperties(
            @ModelAttribute PropertySearchDto propertySearchDto,
            @RequestParam(defaultValue = "0") int pageNo,
            @RequestParam(defaultValue = "10") int limit) {

        Pageable pageable = PageRequest.of(pageNo, limit);


        List<PropertyDto> properties = propertyService.searchProperties(pageable, propertySearchDto);
        return new BaseListResponseDto<>(true, "Properties found successfully", properties);
    }

    @GetMapping("/{id}")
    public BaseResponseDto<PropertyDto> propertyDetails(
            @PathVariable("id") @org.hibernate.validator.constraints.UUID String id) {

        PropertyDto property = propertyService.getPropertyDetails(UUID.fromString(id));

        return new BaseResponseDto<>(true, "Property Fetched Successfully", property);
    }

}
