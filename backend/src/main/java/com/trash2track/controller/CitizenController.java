package com.trash2track.controller;

import com.trash2track.dto.ComplaintRequest;
import com.trash2track.dto.ComplaintResponse;
import com.trash2track.entity.User;
import com.trash2track.service.ComplaintService;
import com.trash2track.service.AuthService;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/citizen/complaints")
public class CitizenController {

    private final ComplaintService complaintService;
    private final AuthService authService;

    public CitizenController(
            ComplaintService complaintService,
            AuthService authService) {

        this.complaintService = complaintService;
        this.authService = authService;
    }

    @PostMapping
    public ComplaintResponse createComplaint(
            @RequestBody ComplaintRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        User citizen = authService.findByEmail(email);

        return complaintService.createComplaint(citizen.getUserId(), request);
    }

    @GetMapping
    public List<ComplaintResponse> getMyComplaints(Authentication authentication) {

        String email = authentication.getName();

        User citizen = authService.findByEmail(email);

        return complaintService.getCitizenComplaints(citizen.getUserId());
    }

    @GetMapping("/{id}")
    public ComplaintResponse getComplaint(
            @PathVariable Long id,
            Authentication authentication) {

        return complaintService.getComplaint(id);
    }
}