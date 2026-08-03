package com.trash2track.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;

@Entity
@Table(name = "worker_routes")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class WorkerRoute {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long routeId;

    private Long workerId;

    private LocalDate routeDate;
}