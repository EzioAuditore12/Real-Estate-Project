package com.realestate.server.property.services;

import java.util.List;
import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.manager.ManagerService;
import com.realestate.server.manager.entites.ManagerEntity;
import com.realestate.server.property.dto.CreatePropertyDto;
import com.realestate.server.property.dto.location.InsertLocationDto;
import com.realestate.server.property.dto.nomantim.NomantimApiResponseDto;
import com.realestate.server.property.dto.nomantim.NomantimSearchLocationDto;
import com.realestate.server.property.entities.LocationEntity;
import com.realestate.server.property.entities.PropertyEntity;
import com.realestate.server.property.mappers.PropertyMapper;
import com.realestate.server.property.repositories.PropertyRespository;
import com.realestate.server.property.utils.NomantimUtils;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class PropertyService {

    private final CloudinaryService cloudinaryService;
    private final PropertyRespository propertyRespository;
    private final PropertyMapper propertyMapper;
    private final LocationService locationService;
    private final ManagerService managerService;

    public PropertyEntity createProperty(UUID managerId, CreatePropertyDto createPropertyDto) {

        List<String> uploadedImageUrls = cloudinaryService.uploadMultipleFiles(createPropertyDto.getPhotos());

        NomantimSearchLocationDto nomantimSearchLocationDto = new NomantimSearchLocationDto(
                createPropertyDto.getAddress(),
                createPropertyDto.getCity(),
                createPropertyDto.getState(),
                createPropertyDto.getCountry(),
                Integer.toString(createPropertyDto.getPostalCode()));

        NomantimApiResponseDto nomantimApiResponseDto = NomantimUtils.getGeoLocationDetails(nomantimSearchLocationDto);

        if (Objects.isNull(nomantimApiResponseDto))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to find such location");

        InsertLocationDto insertLocationDto = new InsertLocationDto(
                createPropertyDto.getAddress(),
                createPropertyDto.getCity(),
                createPropertyDto.getState(),
                createPropertyDto.getCountry(),
                Integer.toString(createPropertyDto.getPostalCode()),
                Double.parseDouble(nomantimApiResponseDto.getLat()),
                Double.parseDouble(nomantimApiResponseDto.getLon()));

        LocationEntity locationEntity = locationService.insertLocation(insertLocationDto);

        PropertyEntity propertyEntity = propertyMapper.fromCreateDto(createPropertyDto);

        propertyEntity.setPhotoUrls(uploadedImageUrls);
        propertyEntity.setLocationId(locationEntity);

        ManagerEntity managerEntity = managerService.findEntityById(managerId);

        propertyEntity.setManagerId(managerEntity);

        return propertyRespository.save(propertyEntity);

    }

}
