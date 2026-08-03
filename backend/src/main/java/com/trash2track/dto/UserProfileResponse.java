package com.trash2track.dto;

public class UserProfileResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String phone;
    private String role;

    public UserProfileResponse(Long userId, String fullName, String email, String phone, String role) {
        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.phone = phone;
        this.role = role;
    }

    // getters
}