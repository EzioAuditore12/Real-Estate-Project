package com.realestate.server.auth;

import java.util.Objects;

import org.springframework.http.HttpStatus;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.dto.LoginUserDto;
import com.realestate.server.auth.dto.RegisterUserDto;
import com.realestate.server.auth.dto.RegisterUserResponseDto;
import com.realestate.server.auth.utils.JwtService;
import com.realestate.server.user.UserService;
import com.realestate.server.user.dto.UserDto;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class AuthService {

    private final UserService userService;
    private final AuthMapper authMapper;
    private final PasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
    private final JwtService jwtService;

    public RegisterUserResponseDto registerUser(RegisterUserDto registerUserDto) {
        UserDto existingUser = userService.findByEmail(registerUserDto.getEmail());

        if (!Objects.isNull(existingUser))
            throw new ResponseStatusException(HttpStatus.CONFLICT,
                    "User with this email is already registered with us");

        String hashedPassword = passwordEncoder.encode(registerUserDto.getPassword());
        
        registerUserDto.setPassword(hashedPassword);

        UserDto createdUser = userService.createUser(registerUserDto);

        return authMapper.toRegisterUserResponseDto(createdUser);
    }

    public String validateUser(LoginUserDto loginUserDto) {
        UserDto existingUser = userService.findByEmail(loginUserDto.getEmail());

        if(Objects.isNull(existingUser))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Given user with this email does not exist");

        boolean isValidPassword = passwordEncoder.matches(loginUserDto.getPasssword(), existingUser.getPassword());

        if(!isValidPassword) 
            throw new ResponseStatusException(HttpStatus.UNAUTHORIZED, "Eithere entered email or password is wrong");
        
        
        // return authMapper.toRegisterUserResponseDto(existingUser);
        return jwtService.generateToken(existingUser.getId());
    }
}
