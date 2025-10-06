package com.realestate.server.manager;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.manager.dto.CreateManagerDto;
import com.realestate.server.manager.dto.ManagerDto;
import com.realestate.server.manager.entites.ManagerEntity;
import com.realestate.server.manager.repositories.ManagerRepository;

import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class ManagerService {

    private final ManagerRepository managerRepository;
    private final ManagerMapper managerMapper;

    public ManagerDto findByEmail(String email) {
        return managerRepository.findByEmail(email).map(managerMapper::toDto).orElse(null);
    }

    @Transactional
    public ManagerDto findById(UUID userId) {
        return managerRepository.findById(userId).map(managerMapper::toDto).orElse(null);
    }

    public ManagerDto createManagerAccount(CreateManagerDto createManagerDto) {
        ManagerEntity manager = managerMapper.fromCreateDto(createManagerDto);

        ManagerEntity createdAccount = managerRepository.save(manager);

        return managerMapper.toDto(createdAccount);
    }

    public ManagerEntity findEntityById(UUID userId) {
    return managerRepository.findById(userId).orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Manager not found"));
}

}
