package com.realestate.server.payment;

import java.util.List;
import java.util.UUID;

import org.springframework.stereotype.Service;

import com.realestate.server.payment.dto.PaymentDto;
import com.realestate.server.payment.entities.Payment;
import com.realestate.server.payment.repositories.PaymentRepository;

import lombok.RequiredArgsConstructor;
import reactor.core.publisher.Flux;

@Service
@RequiredArgsConstructor
public class PaymentService {
    
    private final PaymentRepository paymentRepository;
    private final PaymentMapper paymentMapper;

    public Flux<PaymentDto> findPaymentWithIds(List<UUID> ids) {

        List<Payment> payments = paymentRepository.findAllById(ids);

        return Flux.fromIterable(
                payments.stream().map(paymentMapper::toDto).toList());

    }

}
