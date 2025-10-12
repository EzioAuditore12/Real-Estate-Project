package com.realestate.server.property.dto.property;

import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;

import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.property.enums.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertySummaryDto {
    
    private UUID id;

    private String name;

    private Double pricePerMonth;

    private List<String> photoUrls;

    private PropertyType propertyType;

    private List<AmenityType> amenities;

    private List<HighlightType> highlights;

    private boolean petAllowed;

    private boolean parkingIncluded;

    private Integer beds;

    private Integer baths;

    private Double squareFeet;

    private LocalDateTime postedDate;

    private Double averageRatings;

    private Double numberOfRatings;

    private UUID managerId; 

}
