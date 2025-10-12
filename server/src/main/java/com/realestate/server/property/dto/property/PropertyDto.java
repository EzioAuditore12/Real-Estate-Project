package com.realestate.server.property.dto.property;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Set;
import java.util.UUID;

import com.realestate.server.property.dto.location.LocationDto;
import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.property.enums.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDto {

    private UUID id;

    private String name;

    private String description;

    private Double pricePerMonth;

    private Double securityDeposit;

    private List<String> photoUrls;

    private List<AmenityType> amenities;

    private List<HighlightType> highlights;

    private PropertyType propertyType;

    private boolean petAllowed;

    private boolean parkingIncluded;

    private Integer beds;

    private Integer baths;

    private Double squareFeet;

    private LocalDateTime postedDate;

    private Double averageRatings;

    private Double numberOfRatings;

    private LocationDto location;

    private UUID managerId; 

    private Set<UUID> applicationIds; 

    private Set<UUID> propertyTenantPaymentApplicationIds; 
}
