package com.trash2track.controller;

import com.trash2track.entity.RouteStop;
import com.trash2track.entity.WorkerRoute;
import com.trash2track.service.RouteService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/worker/routes")
public class RouteController {

    private final RouteService routeService;

    public RouteController(RouteService routeService) {
        this.routeService = routeService;
    }

    @GetMapping
    public List<WorkerRoute> getWorkerRoutes(@RequestParam Long workerId) {
        return routeService.getWorkerRoutes(workerId);
    }

    @GetMapping("/{routeId}/stops")
    public List<RouteStop> getRouteStops(@PathVariable Long routeId) {
        return routeService.getRouteStops(routeId);
    }

    @PutMapping("/stops/{stopId}/complete")
    public RouteStop completeStop(@PathVariable Long stopId) {
        return routeService.completeStop(stopId);
    }
}