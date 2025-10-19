package com.realestate.server.manager;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerPublicDto;
import com.realestate.server.manager.entities.Manager;

@Mapper(componentModel = "spring")
public interface ManagerMapper {
    
    ManagerDto toDto(Manager manager);

    ManagerPublicDto toPublicDto(ManagerDto managerDto);

    @Mapping(target = "id", ignore = true)
    @Mapping(target = "createdAt", ignore = true)
    @Mapping(target = "updatedAt", ignore = true)
     @Mapping(target = "avatar", ignore = true)
    Manager fromCreateDto(CreateManagerDto createManagerDto);

}
