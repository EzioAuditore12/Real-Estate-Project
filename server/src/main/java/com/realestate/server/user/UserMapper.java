package com.realestate.server.user;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.user.dto.CreateUserDto;
import com.realestate.server.user.dto.UserDto;
import com.realestate.server.user.entites.UserEntity;

@Mapper(componentModel = "spring")
public interface UserMapper {
    UserDto toDto(UserEntity entity);

    UserEntity toEntity(UserDto dto);

    @Mapping(target = "id", ignore = true)
    UserEntity fromCreateDto(CreateUserDto dto);
}
