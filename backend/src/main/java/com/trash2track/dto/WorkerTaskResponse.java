package com.trash2track.dto;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkerTaskResponse {

    private Long complaintId;

    private String title;

    private String description;

    private String location;

    private String status;
}