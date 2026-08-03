package com.trash2track.dto;

public class WorkerPerformanceResponse {

    private Long workerId;
    private Long completedStops;

    public WorkerPerformanceResponse(Long workerId, Long completedStops) {
        this.workerId = workerId;
        this.completedStops = completedStops;
    }

    public Long getWorkerId() {
        return workerId;
    }

    public Long getCompletedStops() {
        return completedStops;
    }
}