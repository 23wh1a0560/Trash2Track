package com.trash2track.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "email_verification")
public class EmailVerification {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String otp;
    private LocalDateTime expiryTime;
    private boolean verified;

    public Long getId() { return id; }

    public String getEmail() { return email; }

    public String getOtp() { return otp; }

    public LocalDateTime getExpiryTime() { return expiryTime; }

    public boolean isVerified() { return verified; }

    public void setId(Long id) { this.id = id; }

    public void setEmail(String email) { this.email = email; }

    public void setOtp(String otp) { this.otp = otp; }

    public void setExpiryTime(LocalDateTime expiryTime) { this.expiryTime = expiryTime; }

    public void setVerified(boolean verified) { this.verified = verified; }
}