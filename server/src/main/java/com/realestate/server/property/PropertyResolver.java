package com.realestate.server.property;

import java.util.UUID;

import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.services.PropertyService;

import lombok.RequiredArgsConstructor;

import org.springframework.graphql.data.method.annotation.Argument;
import org.springframework.graphql.data.method.annotation.QueryMapping;
import org.springframework.stereotype.Controller;

@Controller
@RequiredArgsConstructor
public class PropertyResolver {

    private final PropertyService propertyService;

    @QueryMapping
    public PropertyDto getProperty(@Argument("id") UUID id) {
      return propertyService.getPropertyDetails(id);
    }

}
