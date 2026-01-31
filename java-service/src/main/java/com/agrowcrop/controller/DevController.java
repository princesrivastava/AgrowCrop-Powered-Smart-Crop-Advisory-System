package com.agrowcrop.controller;

import com.agrowcrop.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/dev")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class DevController {

    private final OtpRepository otpRepo;

    // DEVELOPMENT ONLY - Shows OTP codes for testing
    @GetMapping("/otp/{phone}")
    public ResponseEntity<?> getOtp(@PathVariable String phone) {
        return otpRepo.findByPhone(phone)
                .map(token -> {
                    Map<String, String> response = new HashMap<>();
                    response.put("phone", phone);
                    response.put("otp", token.getOtp());
                    response.put("expiresAt", token.getExpiresAt().toString());
                    return ResponseEntity.ok(response);
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
