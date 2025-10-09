package com.realestate.server.manager;

import java.util.Objects;
import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.common.services.CloudinaryService;
import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.dto.ManagerSummaryDto;
import com.realestate.server.manager.entites.Manager;
import com.realestate.server.manager.repositories.ManagerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final ManagerMapper managerMapper;
    private final CloudinaryService cloudinaryService;

    public ManagerDto findByEmail(String email) {
        return managerRepository.findByEmail(email).map(managerMapper::toDto).orElse(null);
    }

    @Transactional
    public ManagerDto findById(UUID userId) {
        return managerRepository.findById(userId).map(managerMapper::toDto).orElse(null);
    }

    public ManagerSummaryDto createManagerAccount(CreateManagerDto createManagerDto) {
        Manager manager = managerMapper.fromCreateDto(createManagerDto);

        if (Objects.nonNull(createManagerDto.getAvatar())) {
            String uploadedAvatarUrl = cloudinaryService.uploadFile(createManagerDto.getAvatar());
            manager.setAvatar(uploadedAvatarUrl);
        }

        Manager createdAccount = managerRepository.save(manager);

        return managerMapper.toSummaryDto(createdAccount);
    }

    public Manager findEntityById(UUID userId) {
        return managerRepository.findById(userId)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));
    }
}
