package com.trash2track.controller;

import com.trash2track.dto.UpdateComplaintStatusRequest;
import com.trash2track.service.WorkerService;
import com.trash2track.service.RouteBuilderService;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;

@RestController
@RequestMapping("/worker")
public class WorkerController {

    private final WorkerService workerService;
    private final RouteBuilderService routeBuilderService;

    public WorkerController(
            WorkerService workerService,
            RouteBuilderService routeBuilderService) {

        this.workerService = workerService;
        this.routeBuilderService = routeBuilderService;
    }

    // ----------------------------
    // Get worker assigned tasks
    // ----------------------------
    @GetMapping("/tasks")
    public ResponseEntity<?> getTasks(Authentication authentication) {

        String email = authentication.getName();

        Long workerId = workerService.getWorkerIdByEmail(email);

        return ResponseEntity.ok(
                workerService.getWorkerTasks(workerId)
        );
    }

    // ----------------------------
    // Worker updates complaint status
    // ----------------------------
    @PatchMapping("/complaints/{id}/status")
    public ResponseEntity<?> updateStatus(
            @PathVariable Long id,
            @RequestBody UpdateComplaintStatusRequest request,
            Authentication authentication) {

        String email = authentication.getName();

        Long workerId = workerService.getWorkerIdByEmail(email);

        workerService.updateComplaintStatus(
                id,
                request.getStatus(),
                workerId
        );

        return ResponseEntity.ok("Complaint status updated");
    }

    // ----------------------------
    // Get worker optimized route
    // ----------------------------
    @GetMapping("/today-route")
    public ResponseEntity<?> getTodayRoute(Authentication authentication) {

        String email = authentication.getName();

        Long workerId = workerService.getWorkerIdByEmail(email);

        return ResponseEntity.ok(
                routeBuilderService.buildWorkerRoute(workerId)
        );
    }
}