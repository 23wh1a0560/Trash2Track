package com.trash2track.repository;

import com.trash2track.entity.Pickup;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PickupRepository extends JpaRepository<Pickup, Long> {
}