package com.trash2track.service;

import com.trash2track.entity.EmailVerification;
import com.trash2track.repository.EmailVerificationRepository;
import com.trash2track.repository.UserRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
public class OtpService {

    @Autowired
    private EmailVerificationRepository repository;

    @Autowired
    private EmailService emailService;

    @Autowired
    private UserRepository userRepository;

    public void sendOtp(String email, boolean forReset) {

        // Signup OTP
        if (!forReset && userRepository.existsByEmail(email)) {
            throw new RuntimeException("User already exists. Please login.");
        }

        // Password reset OTP
        if (forReset && !userRepository.existsByEmail(email)) {
            throw new RuntimeException("User not found.");
        }

        // Remove old OTP if present
        repository.findByEmail(email).ifPresent(repository::delete);

        // Generate new OTP
        String otp = String.valueOf((int) (Math.random() * 900000) + 100000);

        EmailVerification ev = new EmailVerification();
        ev.setEmail(email);
        ev.setOtp(otp);
        ev.setExpiryTime(LocalDateTime.now().plusMinutes(5));
        ev.setVerified(false);

        repository.save(ev);

        // Send email
        emailService.sendOtp(email, otp);
    }

    public boolean verifyOtp(String email, String otp) {

        EmailVerification ev = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP not requested"));

        if (ev.getExpiryTime().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("OTP expired");
        }

        if (!ev.getOtp().equals(otp)) {
            throw new RuntimeException("Invalid OTP");
        }

        ev.setVerified(true);
        repository.save(ev);

        return true;
    }

    public boolean isVerified(String email) {

        EmailVerification ev = repository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("OTP verification required"));

        return ev.isVerified();
    }

    public void deleteOtp(String email) {
        repository.findByEmail(email).ifPresent(repository::delete);
    }
}