package com.realestate.server.property.dto.location;

import java.util.UUID;

import org.locationtech.jts.geom.Point;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class LocationDto {
    private UUID id;
    private String address;
    private String city;
    private String state;
    private String country;
    private String postalCode;
    private Point coordinates;
}
