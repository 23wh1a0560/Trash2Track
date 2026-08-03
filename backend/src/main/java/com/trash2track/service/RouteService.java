package com.trash2track.service;

import com.trash2track.entity.Complaint;
import com.trash2track.entity.Pickup;
import com.trash2track.entity.RouteStop;
import com.trash2track.entity.WorkerRoute;
import com.trash2track.repository.ComplaintRepository;
import com.trash2track.repository.PickupRepository;
import com.trash2track.repository.RouteStopRepository;
import com.trash2track.repository.WorkerRouteRepository;
import org.springframework.stereotype.Service;
import com.trash2track.dto.WorkerPerformanceResponse;
import java.time.LocalDate;
import java.util.List;

@Service
public class RouteService {

    private final WorkerRouteRepository workerRouteRepository;
    private final RouteStopRepository routeStopRepository;
    private final ComplaintRepository complaintRepository;
    private final PickupRepository pickupRepository;

    public RouteService(
            WorkerRouteRepository workerRouteRepository,
            RouteStopRepository routeStopRepository,
            ComplaintRepository complaintRepository,
            PickupRepository pickupRepository) {

        this.workerRouteRepository = workerRouteRepository;
        this.routeStopRepository = routeStopRepository;
        this.complaintRepository = complaintRepository;
        this.pickupRepository = pickupRepository;
    }

    public List<WorkerRoute> getWorkerRoutes(Long workerId) {

        LocalDate today = LocalDate.now();

        return workerRouteRepository.findByWorkerIdAndRouteDate(workerId, today);
    }

    public List<RouteStop> getRouteStops(Long routeId) {

        return routeStopRepository.findByRouteIdOrderByStopOrder(routeId);
    }

    public RouteStop completeStop(Long stopId) {

        RouteStop stop = routeStopRepository.findById(stopId)
                .orElseThrow(() -> new RuntimeException("Stop not found"));

        stop.setIsCompleted(true);
        routeStopRepository.save(stop);

        if (stop.getComplaintId() != null) {

            Complaint complaint = complaintRepository
                    .findById(stop.getComplaintId())
                    .orElseThrow();

            complaint.setStatus("resolved");
            complaintRepository.save(complaint);
        }

        if (stop.getPickupId() != null) {

            Pickup pickup = pickupRepository
                    .findById(stop.getPickupId())
                    .orElseThrow();

            pickup.setStatus("completed");
            pickupRepository.save(pickup);
        }

        return stop;
    }
    public List<WorkerPerformanceResponse> getWorkerPerformance() {
    return routeStopRepository.getWorkerPerformance();
    }
}