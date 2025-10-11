package com.realestate.server.property.services;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.manager.ManagerService;
import com.realestate.server.manager.entites.Manager;
import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.dto.nomantim.NomantimApiResponseDto;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.dto.property.PropertySummaryDto;
import com.realestate.server.property.entities.Location;
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

    private final ManagerService managerService;

    private final LocationService locationService;

    @Transactional
    public PropertyDto initializeProperty(UUID managerId, CreatePropertyDto createPropertyDto) {

        NomantimApiResponseDto nomantimApiResponseDto = buildLocationWithNomantim(
                Double.parseDouble(createPropertyDto.getLatitude()),
                Double.parseDouble(createPropertyDto.getLongitude()));

        if (Objects.isNull(nomantimApiResponseDto))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find such location");

        LocationDto locationDto = locationService.findLocationByLongitudeAndLatitude(
                Double.parseDouble(nomantimApiResponseDto.getLon()),
                Double.parseDouble(nomantimApiResponseDto.getLat()));

        if (Objects.nonNull(locationDto))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A property with this location is already registered");

        List<String> uploadedImageUrls = cloudinaryService.uploadMultipleFiles(createPropertyDto.getPhotos());

        Property property = propertyMapper.toCreateEntity(createPropertyDto);

        property.setPhotoUrls(uploadedImageUrls);

        Manager manager = managerService.findEntityById(managerId);

        property.setManager(manager);

        Property savedProperty = propertyRespository.save(property);

        InsertLocationDto insertLocationDto = buildLocation(createPropertyDto, nomantimApiResponseDto);

        Location savedLocation = locationService.insertSavedLocation(insertLocationDto, savedProperty);

        savedProperty.setLocation(savedLocation);

        return propertyMapper.toDto(savedProperty);
    }

    public PropertyDto getPropertyDetails(UUID id) {
        Property property = propertyRespository.findById(id).orElse(null);

        if (Objects.isNull(property))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find such property");

        return propertyMapper.toDto(property);
    }

    public List<PropertySummaryDto> getAllManagerCreatedProperties(UUID id) {

        List<Property> managedProperties = propertyRespository.findAllByManagerId(id);

        return managedProperties.stream()
                .map(propertyMapper::toSummaryDto)
                .toList();

    }

    private InsertLocationDto buildLocation(CreatePropertyDto createPropertyDto,
            NomantimApiResponseDto nomantimApiResponseDto) {

        return InsertLocationDto.builder()
                .address(createPropertyDto.getAddress())
                .city(createPropertyDto.getCity())
                .state(createPropertyDto.getState())
                .country(createPropertyDto.getCountry())
                .postalCode(createPropertyDto.getPostalCode())
                .longitude(Double.parseDouble(nomantimApiResponseDto.getLon()))
                .latitude(Double.parseDouble(nomantimApiResponseDto.getLat()))
                .build();
    }

    private NomantimApiResponseDto buildLocationWithNomantim(Double latitude, Double longitude) {

        NomantimApiResponseDto nomantimApiResponseDto = NomantimUtils.getReverseGeoLocationDetails(latitude, longitude);

        if (Objects.isNull(nomantimApiResponseDto))
            return null;

        return nomantimApiResponseDto;
    }

}
