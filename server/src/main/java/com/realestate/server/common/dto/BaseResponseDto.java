package com.realestate.server.common.dto;

import com.fasterxml.jackson.annotation.JsonUnwrapped;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseResponseDto <T> {
    
    private boolean success;

    private String message;

    @JsonUnwrapped
    private T data;

}
