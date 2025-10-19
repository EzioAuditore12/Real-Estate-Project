package com.realestate.server.auth;

import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import com.realestate.server.auth.dto.BlackListRefreshTokenDto;
import com.realestate.server.auth.entities.BlackListRefreshToken;

@Mapper(componentModel = "spring")
public interface AuthMapper {

    @Mapping(target = "id", ignore = true)
    BlackListRefreshToken insertBlackListedToken(BlackListRefreshTokenDto dto);
    
}
