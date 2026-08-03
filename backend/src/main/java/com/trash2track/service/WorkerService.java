package com.trash2track.service;

import com.trash2track.dto.WorkerTaskResponse;
import com.trash2track.entity.Complaint;
import com.trash2track.entity.ComplaintAssignment;
import com.trash2track.entity.StatusHistory;
import com.trash2track.entity.User;

import com.trash2track.repository.ComplaintRepository;
import com.trash2track.repository.ComplaintAssignmentRepository;
import com.trash2track.repository.StatusHistoryRepository;
import com.trash2track.repository.UserRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class WorkerService {

    private final ComplaintRepository complaintRepository;
    private final ComplaintAssignmentRepository assignmentRepository;
    private final StatusHistoryRepository historyRepository;
    private final UserRepository userRepository;

    public WorkerService(
            ComplaintRepository complaintRepository,
            ComplaintAssignmentRepository assignmentRepository,
            StatusHistoryRepository historyRepository,
            UserRepository userRepository) {

        this.complaintRepository = complaintRepository;
        this.assignmentRepository = assignmentRepository;
        this.historyRepository = historyRepository;
        this.userRepository = userRepository;
    }

    // Get workerId using email
    public Long getWorkerIdByEmail(String email){

        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new RuntimeException("User not found"));

        return user.getUserId();
    }

    // Get worker tasks
    public List<WorkerTaskResponse> getWorkerTasks(Long workerId){

        List<ComplaintAssignment> assignments =
                assignmentRepository.findByAssignedWorkerId(workerId);

        List<WorkerTaskResponse> tasks = new ArrayList<>();

        for(ComplaintAssignment assignment : assignments){

            Complaint complaint =
                    complaintRepository.findById(assignment.getComplaintId())
                            .orElseThrow(() -> new RuntimeException("Complaint not found"));

            WorkerTaskResponse task = new WorkerTaskResponse();

            task.setComplaintId(complaint.getComplaintId());
            task.setTitle("Complaint #" + complaint.getComplaintId());
            task.setDescription(complaint.getDescription());
            task.setStatus(complaint.getStatus());

            tasks.add(task);
        }

        return tasks;
    }

    // Update complaint status
    public void updateComplaintStatus(Long complaintId, String status, Long workerId){

        Complaint complaint = complaintRepository.findById(complaintId)
                .orElseThrow(() -> new RuntimeException("Complaint not found"));

        String oldStatus = complaint.getStatus();

        complaint.setStatus(status);

        complaintRepository.save(complaint);

        StatusHistory history = new StatusHistory();

        history.setComplaintId(complaintId);
        history.setOldStatus(oldStatus);
        history.setNewStatus(status);
        history.setChangedBy(workerId);

        historyRepository.save(history);
    }
}