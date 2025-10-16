package com.realestate.server.property;

import java.util.UUID;

import com.realestate.server.common.dto.PaginationDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertyPageDto;
import com.realestate.server.property.dto.property.PropertySearchDto;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.services.PropertyService;

import lombok.RequiredArgsConstructor;

import org.springframework.data.domain.Page;
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

  @QueryMapping
  public PropertyPageDto getProperties(
      @Argument PropertySearchDto search,
      @Argument int page,
      @Argument int size) {

    Page<Property> propertyPage = propertyService.getAllPropertiesBySearch(search, page, size);

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

}
