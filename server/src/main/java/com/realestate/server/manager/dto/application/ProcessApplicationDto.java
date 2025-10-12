package com.realestate.server.manager.dto.application;

import com.realestate.server.tenant.enums.ApplicationStatusType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ProcessApplicationDto {
    
    ApplicationStatusType applicationStatus;
    


}
