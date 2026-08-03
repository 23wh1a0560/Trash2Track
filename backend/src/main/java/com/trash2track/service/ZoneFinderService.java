package com.trash2track.service;

import com.trash2track.entity.WorkerZone;
import com.trash2track.repository.WorkerZoneRepository;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ZoneFinderService {

    private final WorkerZoneRepository workerZoneRepository;

    public ZoneFinderService(WorkerZoneRepository workerZoneRepository) {
        this.workerZoneRepository = workerZoneRepository;
    }

    public Long findWorkerForLocation(double lat, double lng){

        List<WorkerZone> zones = workerZoneRepository.findAll();

        for(WorkerZone zone : zones){

            double distance = calculateDistance(
                    lat,
                    lng,
                    zone.getCenterLat(),
                    zone.getCenterLng()
            );

            if(distance <= zone.getRadiusKm()){
                return zone.getWorkerId();
            }
        }

        return null;
    }

    private double calculateDistance(double lat1, double lon1,
                                     double lat2, double lon2){

        final int R = 6371;

        double latDistance = Math.toRadians(lat2 - lat1);
        double lonDistance = Math.toRadians(lon2 - lon1);

        double a =
                Math.sin(latDistance / 2) * Math.sin(latDistance / 2)
                + Math.cos(Math.toRadians(lat1))
                * Math.cos(Math.toRadians(lat2))
                * Math.sin(lonDistance / 2)
                * Math.sin(lonDistance / 2);

        double c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

        return R * c;
    }
}