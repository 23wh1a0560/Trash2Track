package com.trash2track.repository;

import com.trash2track.entity.ComplaintImage;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface ComplaintImageRepository extends JpaRepository<ComplaintImage, Long> {

    List<ComplaintImage> findByComplaintId(Long complaintId);
}