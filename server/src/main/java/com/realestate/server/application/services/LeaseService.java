package com.realestate.server.application.services;

import java.util.UUID;

import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import com.realestate.server.application.dto.LeaseDto;
import com.realestate.server.application.dto.StartLeaseDto;
import com.realestate.server.application.entities.Lease;
import com.realestate.server.application.mapppers.LeaseMapper;
import com.realestate.server.application.repositories.LeaseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaseService {

    private final LeaseRepository leaseRepository;
    private final LeaseMapper leaseMapper;

    public Lease createLease(UUID applicationId, StartLeaseDto startLeaseDto) {

        boolean existingLease = leaseRepository.existsByApplication_Id(applicationId);

        if (existingLease)
            throw new ResponseStatusException(HttpStatus.CONFLICT, "Lease already exists for this application");

        return Lease.builder()
                .startDate(startLeaseDto.getStartDate())
                .endDate(startLeaseDto.getEndDate())
                .rent(startLeaseDto.getRent())
                .deposit(startLeaseDto.getDeposit())
                .build();

    }

    public LeaseDto findById(UUID leaseId) {
        return leaseRepository.findById(leaseId).map(leaseMapper::toDto).orElse(null);
    }

}
