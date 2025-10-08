package com.realestate.server.property.dto.location;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class InsertLocationDto {
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private Double longitude;
    private Double latitude;
}
