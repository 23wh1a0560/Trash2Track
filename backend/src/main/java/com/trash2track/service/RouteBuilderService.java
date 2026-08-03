package com.trash2track.service;

import com.trash2track.dto.WorkerRouteStop;
import com.trash2track.entity.CollectionPoint;
import com.trash2track.entity.Complaint;
import com.trash2track.entity.WorkerZone;

import com.trash2track.repository.CollectionPointRepository;
import com.trash2track.repository.ComplaintRepository;
import com.trash2track.repository.WorkerZoneRepository;

import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteBuilderService {

    private final CollectionPointRepository collectionPointRepository;
    private final ComplaintRepository complaintRepository;
    private final WorkerZoneRepository workerZoneRepository;

    public RouteBuilderService(
            CollectionPointRepository collectionPointRepository,
            ComplaintRepository complaintRepository,
            WorkerZoneRepository workerZoneRepository) {

        this.collectionPointRepository = collectionPointRepository;
        this.complaintRepository = complaintRepository;
        this.workerZoneRepository = workerZoneRepository;
    }

    public List<WorkerRouteStop> buildWorkerRoute(Long workerId){

        WorkerZone zone = workerZoneRepository.findByWorkerId(workerId);

        if(zone == null){
            throw new RuntimeException("Worker zone not configured");
        }

        List<WorkerRouteStop> stops = new ArrayList<>();

        // Collection points
        List<CollectionPoint> points = collectionPointRepository.findAll();

        for(CollectionPoint point : points){

            if(point.getLatitude() != 0 && point.getLongitude() != 0){

                stops.add(new WorkerRouteStop(
                        "collection",
                        point.getName(),
                        point.getLatitude(),
                        point.getLongitude()
                ));
            }
        }

        // Complaints
        List<Complaint> complaints = complaintRepository.findByStatus("PENDING");

        for(Complaint complaint : complaints){

            if(complaint.getLatitude() != null && complaint.getLongitude() != null){

                stops.add(new WorkerRouteStop(
                        "complaint",
                        complaint.getDescription(),
                        complaint.getLatitude(),
                        complaint.getLongitude()
                ));
            }
        }

        return stops;
    }
}