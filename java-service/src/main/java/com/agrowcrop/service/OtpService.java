package com.agrowcrop.service;

import com.agrowcrop.model.OtpToken;
import com.agrowcrop.repository.OtpRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.util.Optional;
import java.util.Random;

@Slf4j
@Service
@RequiredArgsConstructor
public class OtpService {

    private final OtpRepository otpRepo;
    private final Random random = new Random();

    public String sendOrResendOtp(String phone) {
        Optional<OtpToken> existing = otpRepo.findByPhone(phone);

        // If OTP exists and not expired, reuse it
        if (existing.isPresent() && !isExpired(existing.get())) {
            sendSms(phone, existing.get().getOtp());
            return existing.get().getOtp();
        }

        // Otherwise generate new OTP
        String otp = generateOtp();
        OtpToken token = new OtpToken(phone, otp, Instant.now().plusSeconds(300)); // 5 minutes expiry

        otpRepo.deleteByPhone(phone); // Clear existing
        otpRepo.save(token);
        sendSms(phone, otp);
        return otp;
    }

    public boolean verifyOtp(String phone, String otp) {
        Optional<OtpToken> tokenOpt = otpRepo.findByPhone(phone);
        if (tokenOpt.isPresent()) {
            OtpToken token = tokenOpt.get();
            if (!isExpired(token) && token.getOtp().equals(otp)) {
                otpRepo.deleteByPhone(phone); // Validated, remove it
                return true;
            }
        }
        return false;
    }

    private String generateOtp() {
        return String.valueOf(100000 + random.nextInt(900000));
    }

    private boolean isExpired(OtpToken token) {
        return token.getExpiresAt().isBefore(Instant.now());
    }

    private void sendSms(String phone, String otp) {
        // Mock SMS sending
        log.info("------------------------------------------------");
        log.info("SIMULATED SMS: OTP for {} is -> {}", phone, otp);
        log.info("------------------------------------------------");

        // Also print to console for visibility
        System.out.println("\n================================================");
        System.out.println("🔐 OTP CODE FOR " + phone + " IS: " + otp);
        System.out.println("================================================\n");
    }
}
