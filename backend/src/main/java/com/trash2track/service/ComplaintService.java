package com.trash2track.service;

import com.trash2track.dto.ComplaintRequest;
import com.trash2track.dto.ComplaintResponse;
import com.trash2track.dto.AdminDashboardResponse;
import com.trash2track.entity.Complaint;
import com.trash2track.entity.ComplaintAssignment;
import com.trash2track.entity.StatusHistory;
import com.trash2track.repository.ComplaintAssignmentRepository;
import com.trash2track.repository.ComplaintRepository;
import com.trash2track.repository.StatusHistoryRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class ComplaintService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintAssignmentRepository assignmentRepository;
    private final StatusHistoryRepository historyRepository;
    private final ZoneFinderService zoneFinderService;

    public ComplaintService(
            ComplaintRepository complaintRepository,
            ComplaintAssignmentRepository assignmentRepository,
            StatusHistoryRepository historyRepository,
            ZoneFinderService zoneFinderService) {

        this.complaintRepository = complaintRepository;
        this.assignmentRepository = assignmentRepository;
        this.historyRepository = historyRepository;
        this.zoneFinderService = zoneFinderService;
    }

    // Create complaint
    public ComplaintResponse createComplaint(Long citizenId, ComplaintRequest request) {

        Complaint complaint = new Complaint();

        complaint.setCitizenId(citizenId);
        complaint.setDescription(request.getDescription());
        complaint.setComplaintType(request.getComplaintType());
        complaint.setAreaCode(request.getAreaCode());
        complaint.setPriority(request.getPriority());
        complaint.setStatus("PENDING");
        complaint.setCreatedAt(LocalDateTime.now());

        complaint = complaintRepository.save(complaint);

        // AUTO WORKER ASSIGNMENT BASED ON ZONE
        if (request.getLatitude() != null && request.getLongitude() != null) {

            Long workerId = zoneFinderService.findWorkerForLocation(
                    request.getLatitude(),
                    request.getLongitude()
            );

            if (workerId != null) {

                ComplaintAssignment assignment = new ComplaintAssignment();

                assignment.setComplaintId(complaint.getComplaintId());
                assignment.setAssignedWorkerId(workerId);
                assignment.setAssignedBy("SYSTEM");
                assignment.setAssignedAt(LocalDateTime.now());

                assignmentRepository.save(assignment);
            }
        }

        return mapToResponse(complaint);
    }

    // Get complaints for citizen
    public List<ComplaintResponse> getCitizenComplaints(Long citizenId) {

        return complaintRepository.findByCitizenId(citizenId)
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Get single complaint
    public ComplaintResponse getComplaint(Long id) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        return mapToResponse(complaint);
    }

    // Admin: Get all complaints
    public List<ComplaintResponse> getAllComplaints() {

        return complaintRepository.findAll()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    // Update complaint status
    public ComplaintResponse updateComplaintStatus(Long id, String status, Long userId) {

        Complaint complaint = complaintRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        String oldStatus = complaint.getStatus();

        complaint.setStatus(status);
        complaint.setUpdatedAt(LocalDateTime.now());

        complaintRepository.save(complaint);

        StatusHistory history = new StatusHistory();

        history.setComplaintId(id);
        history.setOldStatus(oldStatus);
        history.setNewStatus(status);
        history.setChangedBy(userId);
        history.setChangedAt(LocalDateTime.now());

        historyRepository.save(history);

        return mapToResponse(complaint);
    }

    // Assign worker manually by admin
    public ComplaintAssignment assignWorker(Long complaintId, Long workerId, Long adminId) {

        ComplaintAssignment assignment = new ComplaintAssignment();

        assignment.setComplaintId(complaintId);
        assignment.setAssignedWorkerId(workerId);
        assignment.setAssignedBy("admin-" + adminId);
        assignment.setAssignedAt(LocalDateTime.now());

        return assignmentRepository.save(assignment);
    }

    // Dashboard stats
    public AdminDashboardResponse getDashboardStats() {

        long total = complaintRepository.count();

        long pending = complaintRepository.countByStatus("PENDING");

        long inProgress = complaintRepository.countByStatus("IN_PROGRESS");

        long resolved = complaintRepository.countByStatus("RESOLVED");

        return new AdminDashboardResponse(
                total,
                pending,
                inProgress,
                resolved
        );
    }

    // Complaints by area
    public List<ComplaintResponse> getComplaintsByArea(String areaCode) {

        return complaintRepository.findByAreaCode(areaCode)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    // Escalated complaints
    public List<ComplaintResponse> getEscalatedComplaints() {

        LocalDateTime limit = LocalDateTime.now().minusHours(48);

        return complaintRepository
                .findByStatusAndCreatedAtBefore("PENDING", limit)
                .stream()
                .map(this::mapToResponse)
                .toList();
    }

    private ComplaintResponse mapToResponse(Complaint complaint) {

        return new ComplaintResponse(
                complaint.getComplaintId(),
                complaint.getStatus(),
                complaint.getDescription(),
                complaint.getComplaintType(),
                complaint.getPriority(),
                complaint.getCreatedAt()
        );
    }
}