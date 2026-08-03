package com.trash2track.controller;

import com.trash2track.dto.LoginRequest;
import com.trash2track.dto.RegisterRequest;
import com.trash2track.dto.LoginResponse;
import com.trash2track.dto.UserProfileResponse;
import com.trash2track.entity.User;
import com.trash2track.security.JwtService;
import com.trash2track.service.AuthService;
import com.trash2track.service.OtpService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;
import org.springframework.http.ResponseEntity;

import java.util.Map;

import org.springframework.security.crypto.password.PasswordEncoder;

@RestController
@RequestMapping("/auth")
public class AuthController {

    @Autowired
    private AuthService authService;

    @Autowired
    private JwtService jwtService;

    @Autowired
    private OtpService otpService;


    // SEND OTP (Signup)
    @PostMapping("/send-otp")
    public ResponseEntity<?> sendOtp(@RequestBody Map<String,String> request){

        String email = request.get("email");

        if(email == null || email.isEmpty()){
            return ResponseEntity.badRequest().body("Email is required");
        }

        otpService.sendOtp(email,false);

        return ResponseEntity.ok("Signup OTP sent");
    }


    // VERIFY OTP
    @PostMapping("/verify-otp")
    public ResponseEntity<?> verifyOtp(@RequestBody Map<String,String> request){

        String email = request.get("email");
        String otp = request.get("otp");

        if(email == null || otp == null){
            return ResponseEntity.badRequest().body("Email and OTP are required");
        }

        boolean verified = otpService.verifyOtp(email, otp);

        if(verified){
            return ResponseEntity.ok("Email verified successfully");
        }

        return ResponseEntity.badRequest().body("Invalid or expired OTP");
    }


    // REGISTER USER
    @Autowired
    private PasswordEncoder passwordEncoder;
    @PostMapping("/register")
public ResponseEntity<?> register(@RequestBody RegisterRequest request) {

    User user = new User();

    user.setFullName(request.getFullName());
    user.setEmail(request.getEmail());
    user.setPasswordHash(passwordEncoder.encode(request.getPassword()));
    user.setPhone(request.getPhone());
    user.setRole(request.getRole());

    authService.register(user);

    return ResponseEntity.ok("User registered successfully"); // ✅ safe response
}


    // LOGIN
    @PostMapping("/login")
    public LoginResponse login(@RequestBody LoginRequest request) {

        User user = authService.login(
                request.getEmail(),
                request.getPassword()
        );

        String token = jwtService.generateToken(
                user.getEmail(),
                user.getRole().name()
        );

        return new LoginResponse(token, user.getRole().name());
    }


    // PROFILE
    @GetMapping("/profile")
    public UserProfileResponse profile(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return new UserProfileResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name()
        );
    }


    // CURRENT USER
    @GetMapping("/me")
    public UserProfileResponse me(Authentication authentication) {

        User user = (User) authentication.getPrincipal();

        return new UserProfileResponse(
                user.getUserId(),
                user.getFullName(),
                user.getEmail(),
                user.getPhone(),
                user.getRole().name()
        );
    }


    // LOGOUT
    @PostMapping("/logout")
    public String logout() {
        return "Logged out successfully";
    }


    // FORGOT PASSWORD
    @PostMapping("/forgot-password")
    public ResponseEntity<?> forgotPassword(@RequestBody Map<String,String> request){

        String email = request.get("email");

        if(email == null || email.isEmpty()){
            return ResponseEntity.badRequest().body("Email is required");
        }

        otpService.sendOtp(email,true);

        return ResponseEntity.ok("Password reset OTP sent");
    }


    // RESET PASSWORD
    @PostMapping("/reset-password")
    public ResponseEntity<?> resetPassword(@RequestBody Map<String,String> request){

        String email = request.get("email");
        String newPassword = request.get("newPassword");

        if(email == null || newPassword == null){
            return ResponseEntity.badRequest().body("Email and new password required");
        }

        authService.resetPassword(email,newPassword);

        return ResponseEntity.ok("Password reset successful");
    }
}