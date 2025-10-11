package com.realestate.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class BaseListResponseDto<T> {
    
    private boolean success;
    private String message;
    private T data;
}
