package com.trash2track.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "complaint_assignment")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ComplaintAssignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long assignmentId;

    private Long complaintId;

    private Long assignedWorkerId;

    private String assignedBy;

    private LocalDateTime assignedAt;
}