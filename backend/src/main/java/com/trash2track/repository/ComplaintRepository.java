package com.trash2track.repository;

import com.trash2track.entity.Complaint;
import org.springframework.data.jpa.repository.JpaRepository;

import java.time.LocalDateTime;
import java.util.List;

public interface ComplaintRepository extends JpaRepository<Complaint, Long> {

    List<Complaint> findByCitizenId(Long citizenId);

    long countByStatus(String status);

    List<Complaint> findByAreaCode(String areaCode);

    List<Complaint> findByStatus(String status);

    List<Complaint> findByStatusAndCreatedAtBefore(String status, LocalDateTime time);
}