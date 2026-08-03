package com.trash2track.controller;

import com.trash2track.entity.User;
import com.trash2track.entity.ComplaintAssignment;
import com.trash2track.dto.ComplaintResponse;
import com.trash2track.dto.AdminDashboardResponse;
import com.trash2track.dto.WorkerPerformanceResponse;
import com.trash2track.service.ComplaintService;
import com.trash2track.service.RouteService;

import org.springframework.web.bind.annotation.*;
import org.springframework.security.core.Authentication;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {

    private final ComplaintService complaintService;
    private final RouteService routeService;

    public AdminController(
            ComplaintService complaintService,
            RouteService routeService) {

        this.complaintService = complaintService;
        this.routeService = routeService;
    }

    // Assign worker to complaint
    @PutMapping("/complaints/{id}/assign")
    public ComplaintAssignment assignWorker(
            @PathVariable Long id,
            @RequestParam Long workerId,
            Authentication authentication) {

        User admin = (User) authentication.getPrincipal();

        return complaintService.assignWorker(id, workerId, admin.getUserId());
    }

    // Get all complaints
    @GetMapping("/complaints")
    public List<ComplaintResponse> getAllComplaints() {
        return complaintService.getAllComplaints();
    }

    // Admin dashboard statistics
    @GetMapping("/dashboard")
    public AdminDashboardResponse getDashboard() {
        return complaintService.getDashboardStats();
    }

    // Area wise complaints
    @GetMapping("/complaints/area/{areaCode}")
    public List<ComplaintResponse> getComplaintsByArea(
            @PathVariable String areaCode) {

        return complaintService.getComplaintsByArea(areaCode);
    }

    // Worker performance
    @GetMapping("/workers/performance")
    public List<WorkerPerformanceResponse> getWorkerPerformance() {
        return routeService.getWorkerPerformance();
    }
    @GetMapping("/complaints/escalated")
    public List<ComplaintResponse> getEscalatedComplaints() {
        return complaintService.getEscalatedComplaints();
    }

}