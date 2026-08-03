package com.trash2track.repository;

import com.trash2track.entity.StatusHistory;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface StatusHistoryRepository extends JpaRepository<StatusHistory, Long> {

    List<StatusHistory> findByComplaintIdOrderByChangedAtAsc(Long complaintId);

}