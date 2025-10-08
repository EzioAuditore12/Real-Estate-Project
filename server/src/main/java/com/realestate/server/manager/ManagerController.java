package com.realestate.server.manager;

import org.hibernate.validator.constraints.UUID;
import org.springframework.http.HttpStatus;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.auth.guards.AuthenticatedManager;
import com.realestate.server.common.dto.BaseResponseDto;
import com.realestate.server.manager.dto.ManagerProfileDto;

import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import java.util.Objects;

@RestController
@RequestMapping("manager")
@RequiredArgsConstructor
@Tag(name = "Manager")
public class ManagerController {

    private final ManagerService managerService;
    private final ManagerMapper managerMapper;

    @GetMapping
    @AuthenticatedManager
    public BaseResponseDto<ManagerProfileDto> getManagerProfile() {
        String userId = SecurityContextHolder.getContext().getAuthentication().getName();

        var manager = managerService.findById(java.util.UUID.fromString(userId));

        return new BaseResponseDto<>(true, "User Verified successfully", managerMapper.toProfileDto(manager));
    }

    @GetMapping("/{id}")
    public BaseResponseDto<ManagerProfileDto> getManagerDetails(@PathVariable("id") @UUID String id) {

        var manager = managerService.findById(java.util.UUID.fromString(id));
        
        if (Objects.isNull(manager))
            throw new ResponseStatusException(HttpStatus.NOT_FOUND, "Unable to locate any user with this id");

        return new BaseResponseDto<>(true, "Manager Details fetched successfully",
                managerMapper.toProfileDto(manager));
    }

}
