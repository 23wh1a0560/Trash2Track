package com.trash2track.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "worker_location_log")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkerLocationLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long locationId;

    private Long workerId;

    private Double latitude;

    private Double longitude;

    private LocalDateTime timestamp;
}