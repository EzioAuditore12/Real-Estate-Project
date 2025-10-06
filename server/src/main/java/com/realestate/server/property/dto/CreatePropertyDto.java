package com.realestate.server.property.dto;

import java.util.List;

import javax.swing.text.Highlighter.Highlight;

import org.springframework.web.multipart.MultipartFile;

import com.realestate.server.property.enums.Amenity;
import com.realestate.server.property.enums.PropertyType;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
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
    @Size(max = 240)
    private String description;

    @NotNull
    private Float pricePerMonth;

    @NotNull
    private Float securityDeposit;

    private List<MultipartFile> photos;

    private List<Amenity> amenities;

    private List<Highlight> highlights;

    private boolean isPetsAllowed = false;

    private boolean isParkingIncluded = false;

    @NotNull
    private Integer beds;

    @NotNull
    private Float baths;

    @NotNull
    private Integer squareFeet;

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

    @Min(100000)
    @Max(999999)
    private Integer postalCode;
}
