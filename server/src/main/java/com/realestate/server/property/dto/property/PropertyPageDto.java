package com.realestate.server.property.dto.property;

import java.util.List;

import com.realestate.server.common.dto.PaginationDto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PropertyPageDto {

    List<PropertyDto> content;

    PaginationDto pagination;

}
