package com.realestate.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class NumericRangeDto {

    private Double lt;

    private Double lte;

    private Double gt;

    private Double gte;

    private Double eq;
    
}
