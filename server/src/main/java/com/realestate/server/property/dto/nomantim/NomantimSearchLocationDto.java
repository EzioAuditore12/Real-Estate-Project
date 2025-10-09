package com.realestate.server.property.dto.nomantim;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class NomantimSearchLocationDto {
    private String city;
    private String state;
    private String country;
    private String postalCode;
}
