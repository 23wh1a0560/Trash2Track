package com.trash2track.entity;

import jakarta.persistence.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "worker_zones")
public class WorkerZone {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long zoneId;

    private Long workerId;

    private double centerLat;

    private double centerLng;

    private double radiusKm = 2;

    private LocalDateTime createdAt = LocalDateTime.now();

    public WorkerZone() {}

    public Long getZoneId() { return zoneId; }

    public Long getWorkerId() { return workerId; }
    public void setWorkerId(Long workerId) { this.workerId = workerId; }

    public double getCenterLat() { return centerLat; }
    public void setCenterLat(double centerLat) { this.centerLat = centerLat; }

    public double getCenterLng() { return centerLng; }
    public void setCenterLng(double centerLng) { this.centerLng = centerLng; }

    public double getRadiusKm() { return radiusKm; }
    public void setRadiusKm(double radiusKm) { this.radiusKm = radiusKm; }

    public LocalDateTime getCreatedAt() { return createdAt; }
}