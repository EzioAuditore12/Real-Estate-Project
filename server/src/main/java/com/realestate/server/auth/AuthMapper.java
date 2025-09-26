package com.realestate.server.auth;

import org.mapstruct.Mapper;

import com.realestate.server.auth.dto.AuthResponseDto;
import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.dto.TokensDto;
import com.realestate.server.auth.entities.BlackListRefreshTokenEntity;
import com.realestate.server.user.dto.UserDto;
import com.realestate.server.user.dto.UserResponseDto;

import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface AuthMapper {
    UserResponseDto toUserResponseDto(UserDto userDto);

    @Mapping(target = "user", source = "userDto")
    AuthResponseDto toAuthenticatedUserResponseDto(UserResponseDto userDto, TokensDto tokens);

    @Mapping(target = "id", ignore = true)
    BlackListRefreshTokenEntity insertBlackListedToken(BlackListRefreshTokenDto dto);
}
