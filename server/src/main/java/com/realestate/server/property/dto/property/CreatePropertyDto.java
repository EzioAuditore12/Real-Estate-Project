package com.realestate.server.property.dto.property;

import java.util.List;

import org.springframework.web.multipart.MultipartFile;

import com.realestate.server.common.validators.StringDigit;
import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.property.enums.PropertyType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class CreatePropertyDto {

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 250)
    private String description;

    @NotNull
    private Double pricePerMonth = 0.0;

    @NotNull
    private Double securityDeposit = 0.0;

    @NotNull
    private List<MultipartFile> photos;

    @NotNull
    private List<AmenityType> amenities;

    @NotNull
    private List<HighlightType> highlights;

    private boolean isPetAllowed = false;

    private boolean isParkingIncluded = false;

    @NotNull
    private Integer beds = 0;

    @NotNull
    private Integer baths = 0;

    @NotNull
    private Float squareFeet;

    @NotNull
    private PropertyType propertyType;

    @NotBlank
    @Size(max = 50)
    private String address;

    @NotBlank
    @Size(max = 50)
    private String city;

    @NotBlank
    @Size(max = 50)
    private String state;

    @NotBlank
    @Size(max = 50)
    private String country;

    @NotBlank
    @StringDigit
    @Size(max = 6)
    private String postalCode;
}
