package com.trash2track.repository;

import com.trash2track.entity.WorkerLocationLog;
import org.springframework.data.jpa.repository.JpaRepository;

public interface WorkerLocationLogRepository extends JpaRepository<WorkerLocationLog, Long> {
}