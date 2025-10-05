package com.realestate.server.common.convertors;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.realestate.server.common.dto.CoordinatesDto;

import jakarta.persistence.AttributeConverter;
import jakarta.persistence.Converter;

@Converter(autoApply = true) 
public class CoordinatesConvertor implements AttributeConverter<CoordinatesDto, String> {
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Override
    public String convertToDatabaseColumn(CoordinatesDto coordinates) {
        if (coordinates == null)
            return null;
        try {
            return objectMapper.writeValueAsString(coordinates);
        } catch (Exception e) {
            throw new CoordinatesConversionException("Error converting coordinates to JSON", e);
        }
    }

    @Override
    public CoordinatesDto convertToEntityAttribute(String dbData) {
        if (dbData == null || dbData.isEmpty())
            return null;
        try {
            return objectMapper.readValue(dbData, CoordinatesDto.class);
        } catch (Exception e) {
            throw new CoordinatesConversionException("Error converting JSON to coordinates", e);
        }
    }
}

/**
 * Custom exception for coordinate conversion errors.
 */
class CoordinatesConversionException extends RuntimeException {
    public CoordinatesConversionException(String message, Throwable cause) {
        super(message, cause);
    }
}
