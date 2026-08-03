package com.trash2track.dto;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ComplaintResponse {

    private Long complaintId;
    private String status;
    private String description;
    private String category;
    private String priority;
    private LocalDateTime createdAt;
}