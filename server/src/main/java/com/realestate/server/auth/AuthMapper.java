package com.realestate.server.auth;

import org.mapstruct.Mapper;

import com.realestate.server.auth.dto.RegisterUserResponseDto;
import com.realestate.server.user.dto.UserDto;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    RegisterUserResponseDto toRegisterUserResponseDto(UserDto userDto);
}
