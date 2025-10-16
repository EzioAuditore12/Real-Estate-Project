package com.realestate.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class PaginationDto {
    
    Integer currentPage;
    
    Integer totalPages;

    Integer totalElements;

    Integer size;
}
