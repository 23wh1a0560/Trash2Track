package com.trash2track.service;

import com.trash2track.entity.User;
import com.trash2track.entity.EmailVerification;
import com.trash2track.repository.UserRepository;
import com.trash2track.repository.EmailVerificationRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.security.crypto.password.PasswordEncoder;

@Service
public class AuthService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private EmailVerificationRepository emailVerificationRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public User register(User user) {

        if (userRepository.existsByEmail(user.getEmail())) {
            throw new RuntimeException("Email already exists");
        }

        EmailVerification ev =
                emailVerificationRepository
                        .findByEmail(user.getEmail())
                        .orElseThrow(() -> new RuntimeException("Please verify email first"));

        if (!ev.isVerified()) {
            throw new RuntimeException("Email not verified");
        }

        
        User savedUser = userRepository.save(user);

        // delete OTP record after successful registration
        emailVerificationRepository.delete(ev);

        return savedUser;
    }

    public User login(String email, String password) {

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        if (!passwordEncoder.matches(password, user.getPasswordHash())) {
            throw new RuntimeException("Invalid password");
        }

        return user;
    }

    public User findByEmail(String email) {

        return userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));
    }
    public void resetPassword(String email, String newPassword) {

    User user = userRepository.findByEmail(email)
            .orElseThrow(() -> new RuntimeException("User not found"));

    user.setPasswordHash(passwordEncoder.encode(newPassword));

    userRepository.save(user);
    }
}