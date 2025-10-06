package com.realestate.server.property.utils;

import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import com.realestate.server.property.dto.nomantim.NomantimApiResponseDto;
import com.realestate.server.property.dto.nomantim.NomantimSearchLocationDto;

public class NomantimUtils {

    private NomantimUtils() {
    }

  
    private static final String USER_AGENT = "RealEstateApp (realEstate@gmail.com)";

    private static String nomantimGeoCodingUrl(NomantimSearchLocationDto nomantimSearchLocationDto) {
        return UriComponentsBuilder.newInstance()
                .scheme("https")
                .host("nominatim.openstreetmap.org")
                .path("/search")
                .queryParam("street", nomantimSearchLocationDto.getStreet())
                .queryParam("city", nomantimSearchLocationDto.getCity())
                .queryParam("state", nomantimSearchLocationDto.getState())
                .queryParam("country", nomantimSearchLocationDto.getCountry())
                .queryParam("postalcode", nomantimSearchLocationDto.getPostalCode())
                .queryParam("format", "json")
                .queryParam("limit", 1)
                .toUriString();
    }

    private static HttpEntity<String> buildNominatimHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.set("User-Agent", USER_AGENT);
        return new HttpEntity<>(headers);
    }

    public static NomantimApiResponseDto getGeoLocationDetails(NomantimSearchLocationDto nomantimSearchLocationDto) {
         String url = nomantimGeoCodingUrl(nomantimSearchLocationDto);
         HttpEntity<String> entity = buildNominatimHeaders();
        RestTemplate restTemplate = new RestTemplate();

         ResponseEntity<NomantimApiResponseDto[]> response = restTemplate.exchange(
                url,
                HttpMethod.GET,
                entity,
                NomantimApiResponseDto[].class
        );

        NomantimApiResponseDto[] results = response.getBody();
        if (results != null && results.length > 0) {
            return results[0];
        }
        return null;
    }
}
