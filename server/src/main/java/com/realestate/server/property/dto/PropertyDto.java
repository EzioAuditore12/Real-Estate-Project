package com.realestate.server.property.dto;

import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;
import com.realestate.server.property.enums.PropertyType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertyDto {
    private UUID id;
    private String name;
    private String description;
    private Float pricePerMonth;
    private Float securityDeposit;
    private List<String> photoUrls;
    private List<AmenityType> amenities;
    private List<HighlightType> highlights;
    private boolean isPetsAllowed;
    private boolean isParkingIncluded;
    private int beds;
    private float baths;
    private int squareFeet;
    private PropertyType propertyType;
    private Date postedDate;
    private float averageRating;
    private int numberOfReviews;
    private UUID locationId;
    private UUID managerId;
    private List<UUID> leaseIds;
    private List<UUID> applicationIds;
    private List<UUID> favouritedByTenantIds;
    private List<UUID> tenantIds;
}
