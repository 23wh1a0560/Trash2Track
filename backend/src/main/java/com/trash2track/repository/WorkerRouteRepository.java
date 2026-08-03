package com.trash2track.repository;

import com.trash2track.entity.WorkerRoute;
import org.springframework.data.jpa.repository.JpaRepository;
import java.time.LocalDate;
import java.util.List;

public interface WorkerRouteRepository extends JpaRepository<WorkerRoute, Long> {

    List<WorkerRoute> findByWorkerId(Long workerId);

    // ADD THIS
    List<WorkerRoute> findByWorkerIdAndRouteDate(Long workerId, LocalDate routeDate);

}