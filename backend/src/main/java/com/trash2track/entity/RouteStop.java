package com.trash2track.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "route_stops")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RouteStop {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long stopId;

    private Long routeId;

    private Long pickupId;

    private Long complaintId;

    private Integer stopOrder;

    private Boolean isCompleted;
}