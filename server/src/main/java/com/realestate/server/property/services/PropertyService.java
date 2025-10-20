package com.realestate.server.property.services;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.manager.ManagerService;
import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.dto.nominatim.NominatimApiResponseDto;
import com.realestate.server.property.dto.property.CreatePropertyDto;
import com.realestate.server.property.dto.property.PropertyDto;
import com.realestate.server.property.entities.Location;
import com.realestate.server.property.entities.Property;
import com.realestate.server.property.mappers.PropertyMapper;
import com.realestate.server.property.repositories.PropertyRepository;
import com.realestate.server.property.utils.NominatimUtils;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final PropertyRepository propertyRepository;
    private final PropertyMapper propertyMapper;

    private final ManagerService managerService;

    private final LocationService locationService;

    private final CloudinaryService cloudinaryService;

    @Transactional
    public PropertyDto initializeProperty(UUID managerId, CreatePropertyDto createPropertyDto) {

        NominatimApiResponseDto nominatimApiResponseDto = buildLocationWithNominatim(
                createPropertyDto.getLatitude(),
                createPropertyDto.getLongitude());

        if (Objects.isNull(nominatimApiResponseDto))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find such location");

        LocationDto locationDto = locationService.findLocationByLongitudeAndLatitude(
                Double.parseDouble(nominatimApiResponseDto.getLon()),
                Double.parseDouble(nominatimApiResponseDto.getLat()));

        if (Objects.nonNull(locationDto))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "A property with this location is already registered");

        List<String> uploadedImageUrls = cloudinaryService.uploadMultipleFiles(createPropertyDto.getPhotos());

        Property property = propertyMapper.toCreateEntity(createPropertyDto);

        property.setPhotoUrls(uploadedImageUrls);

        managerService.SaveProperty(managerId, property);

        Property savedProperty = propertyRepository.save(property);

        InsertLocationDto insertLocationDto = buildLocation(createPropertyDto, nominatimApiResponseDto);

        Location savedLocation = locationService.insertSavedLocation(insertLocationDto, savedProperty);

        savedProperty.setLocation(savedLocation);

        return propertyMapper.toDto(savedProperty);
    }

    public Flux<PropertyDto> findPropertyWithIds(List<UUID> ids) {

        List<Property> properties = propertyRepository.findAllById(ids);

        return Flux.fromIterable(
                properties.stream().map(propertyMapper::toDto).toList());

    }

    private InsertLocationDto buildLocation(CreatePropertyDto createPropertyDto,
            NominatimApiResponseDto nominatimApiResponseDto) {

        return InsertLocationDto.builder()
                .address(createPropertyDto.getAddress())
                .city(createPropertyDto.getCity())
                .state(createPropertyDto.getState())
                .country(createPropertyDto.getCountry())
                .postalCode(createPropertyDto.getPostalCode())
                .longitude(Double.parseDouble(nominatimApiResponseDto.getLon()))
                .latitude(Double.parseDouble(nominatimApiResponseDto.getLat()))
                .build();
    }

    private NominatimApiResponseDto buildLocationWithNominatim(Double latitude, Double longitude) {

        NominatimApiResponseDto nomantimApiResponseDto = NominatimUtils.getReverseGeoLocationDetails(latitude,
                longitude);

        if (Objects.isNull(nomantimApiResponseDto))
            return null;

        return nomantimApiResponseDto;
    }

}
