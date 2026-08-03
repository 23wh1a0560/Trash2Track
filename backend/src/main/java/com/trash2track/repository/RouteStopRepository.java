package com.trash2track.repository;

import com.trash2track.entity.RouteStop;
import com.trash2track.dto.WorkerPerformanceResponse;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RouteStopRepository extends JpaRepository<RouteStop, Long> {

    List<RouteStop> findByRouteId(Long routeId);

    // FIX FOR YOUR ERROR
    List<RouteStop> findByRouteIdOrderByStopOrder(Long routeId);

    @Query("""
    SELECT new com.trash2track.dto.WorkerPerformanceResponse(
        r.workerId,
        COUNT(s.stopId)
    )
    FROM RouteStop s
    JOIN WorkerRoute r ON s.routeId = r.routeId
    WHERE s.isCompleted = true
    GROUP BY r.workerId
    """)
    List<WorkerPerformanceResponse> getWorkerPerformance();
}