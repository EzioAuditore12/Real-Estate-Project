package com.realestate.server.tenant.services;

import com.realestate.server.tenant.entites.Lease;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.realestate.server.tenant.repositories.LeaseRepository;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class LeaseService {
    
    private final LeaseRepository leaseRepository;

    public Lease findByLeaseId(UUID id) {
        return leaseRepository.findById(id).orElse(null);
    }

}
