package com.trash2track.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "worker_zone_rotation")
public class WorkerZoneRotation {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long rotationId;

    private Long workerId;

    private Long zoneId;

    private LocalDate startDate;

    private LocalDate endDate;

    public WorkerZoneRotation() {}

    public Long getRotationId() { return rotationId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public Long getZoneId() { return zoneId; }
    public void setZoneId(Long zoneId) { this.zoneId = zoneId; }

    public LocalDate getStartDate() { return startDate; }
    public void setStartDate(LocalDate startDate) { this.startDate = startDate; }

    public LocalDate getEndDate() { return endDate; }
    public void setEndDate(LocalDate endDate) { this.endDate = endDate; }
}