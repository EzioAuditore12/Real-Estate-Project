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
import com.realestate.server.property.dto.CreatePropertyDto;
import com.realestate.server.property.entities.PropertyEntity;
import com.realestate.server.property.services.PropertyService;

import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.parameters.RequestBody;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;

@RestController
@RequestMapping("property")
@RequiredArgsConstructor
@Tag(name = "Property")
public class PropertyController {

    private final PropertyService propertyService;

    @PostMapping(value = "create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @AuthenticatedManager
    @Operation(summary = "Create a new property", description = "Creates a new property with file uploads")
    @RequestBody(content = @Content(mediaType = MediaType.MULTIPART_FORM_DATA_VALUE, schema = @Schema(implementation = CreatePropertyDto.class)))
    public BaseResponseDto<PropertyEntity> createProperty(@Valid @ModelAttribute CreatePropertyDto createPropertyDto) {

        String managerId = SecurityContextHolder.getContext().getAuthentication().getName();

        PropertyEntity property = propertyService.createProperty(UUID.fromString(managerId), createPropertyDto);

        return new BaseResponseDto<>(true, "Property Created Successfully", property);
    }
}
