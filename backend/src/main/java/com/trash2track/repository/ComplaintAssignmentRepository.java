package com.trash2track.repository;

import com.trash2track.entity.ComplaintAssignment;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ComplaintAssignmentRepository extends JpaRepository<ComplaintAssignment, Long> {

    List<ComplaintAssignment> findByAssignedWorkerId(Long workerId);

}