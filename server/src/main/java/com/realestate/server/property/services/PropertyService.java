package com.realestate.server.property.services;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.nomantim.NomantimApiResponseDto;
import com.realestate.server.property.dto.nomantim.NomantimSearchLocationDto;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.mappers.PropertyMapper;
import com.realestate.server.property.repositories.PropertyRespository;
import com.realestate.server.property.utils.NomantimUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRespository propertyRespository;
    private final PropertyMapper propertyMapper;

    private final CloudinaryService cloudinaryService;

    private final LocationService locationService;

    @Transactional
    public PropertyDto initializeProperty(UUID managerId, CreatePropertyDto createPropertyDto) {

        List<String> uploadedImageUrls = cloudinaryService.uploadMultipleFiles(createPropertyDto.getPhotos());

        NomantimSearchLocationDto nomantimSearchLocationDto = NomantimSearchLocationDto.builder()
                .city(createPropertyDto.getCity())
                .state(createPropertyDto.getState())
                .country(createPropertyDto.getCountry())
                .postalCode(createPropertyDto.getPostalCode())
                .build();

        NomantimApiResponseDto nomantimApiResponseDto = NomantimUtils.getGeoLocationDetails(nomantimSearchLocationDto);

        Property property = propertyMapper.toCreateEntity(createPropertyDto);

        property.setPhotoUrls(uploadedImageUrls);

        Property savedProperty = propertyRespository.save(property);

        if (Objects.isNull(nomantimApiResponseDto))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find such location");

        InsertLocationDto insertLocationDto = InsertLocationDto.builder()
                .address(createPropertyDto.getAddress())
                .city(createPropertyDto.getCity())
                .state(createPropertyDto.getState())
                .country(createPropertyDto.getCountry())
                .postalCode(createPropertyDto.getPostalCode())
                .longitude(Double.parseDouble(nomantimApiResponseDto.getLon()))
                .latitude(Double.parseDouble(nomantimApiResponseDto.getLat()))
                .build();

        locationService.insertSavedLocation(insertLocationDto,savedProperty);

        return propertyMapper.toDto(savedProperty);
    }
}
