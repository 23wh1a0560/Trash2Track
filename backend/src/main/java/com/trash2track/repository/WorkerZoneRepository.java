package com.trash2track.repository;

import com.trash2track.entity.WorkerZone;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerZoneRepository extends JpaRepository<WorkerZone, Long> {

    WorkerZone findByWorkerId(Long workerId);

}