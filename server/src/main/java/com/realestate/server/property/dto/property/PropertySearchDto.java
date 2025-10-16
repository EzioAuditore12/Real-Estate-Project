package com.realestate.server.property.dto.property;

import java.util.List;

import com.realestate.server.common.dto.NumericRangeDto;
import com.realestate.server.property.enums.AmenityType;
import com.realestate.server.property.enums.HighlightType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PropertySearchDto {

    private NumericRangeDto pricePerMonth;

    private NumericRangeDto securityDeposit;

    private List<AmenityType> amenities;

    private List<HighlightType> highlights;

    private boolean petAllowed;

    private boolean parkingIncluded;

    private NumericRangeDto beds;

    private NumericRangeDto baths;

    private NumericRangeDto squareFeet;

    private NumericRangeDto averageRatings;

    private NumericRangeDto numberOfRatings;

    private String address;

    private String city;

    private String state;

    private String country;

    private String postalCode;

}
