package com.realestate.server.property.dto.nomantim;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class NomantimAddress {
    private String city;
    private String state;
    private String country;
    private String country_code;
    private String postcode;
}
