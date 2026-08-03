package com.trash2track.controller;

import com.trash2track.entity.StatusHistory;
import com.trash2track.repository.StatusHistoryRepository;

import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/complaints")
public class ComplaintController {

    private final StatusHistoryRepository statusHistoryRepository;

    public ComplaintController(StatusHistoryRepository statusHistoryRepository) {
        this.statusHistoryRepository = statusHistoryRepository;
    }

    @GetMapping("/{id}/timeline")
    public List<StatusHistory> getTimeline(@PathVariable Long id) {

        return statusHistoryRepository.findByComplaintIdOrderByChangedAtAsc(id);
    }
}