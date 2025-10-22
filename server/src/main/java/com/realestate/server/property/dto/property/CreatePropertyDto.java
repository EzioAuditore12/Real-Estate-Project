package com.realestate.server.property.dto.property;

import java.util.List;

import org.hibernate.validator.constraints.Range;
import org.springframework.web.multipart.MultipartFile;

import com.realestate.server.common.validators.StringDigit;
import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.property.enums.PropertyType;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class CreatePropertyDto {

    @NotBlank
    @Size(max = 50)
    private String name;

    @NotBlank
    @Size(max = 250)
    private String description;

    @NotNull
    @Builder.Default
    private Double pricePerMonth = 0.0;

    @NotNull
    @Builder.Default
    private Double securityDeposit = 0.0;

    @NotNull
    private List<MultipartFile> photos;

    @NotNull
    private List<AmenityType> amenities;

    @NotNull
    private List<HighlightType> highlights;

    @Builder.Default
    private boolean petAllowed = false;

    @Builder.Default
    private boolean parkingIncluded = false;

    @NotNull
    @Builder.Default
    private Integer beds = 0;

    @NotNull
    @Builder.Default
    private Integer baths = 0;

    @NotNull
    private Double squareFeet;

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

    @NotNull
    @Range(min = -180, max = 180)
    private Double longitude;

    @NotNull
    @Range(min = -180, max = 180)
    private Double latitude;

}
