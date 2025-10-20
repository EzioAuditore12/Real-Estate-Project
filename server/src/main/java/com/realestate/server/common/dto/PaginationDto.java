package com.realestate.server.common.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PaginationDto {

    Integer currentPage;

    Integer totalPages;

    Integer totalElements;

    Integer size;

}
