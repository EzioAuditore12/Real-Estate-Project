package com.realestate.server.user;

import org.springframework.stereotype.Service;

import com.realestate.server.user.dto.CreateUserDto;
import com.realestate.server.user.dto.UserDto;
import com.realestate.server.user.entites.UserEntity;
import com.realestate.server.user.repositories.UserRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserDto findByEmail(String email) {
        return userRepository.findByEmail(email).map(userMapper::toDto).orElse(null);
    }

    public UserDto findById(String userId) {
        return userRepository.findById(userId).map(userMapper::toDto).orElse(null);
    }

    public UserDto createUser(CreateUserDto userDto) {
        UserEntity user = userMapper.fromCreateDto(userDto);

        UserEntity createdUser = userRepository.save(user);

        return userMapper.toDto(createdUser);
    }

}
