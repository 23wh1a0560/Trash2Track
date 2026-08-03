package com.trash2track.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name = "pickups")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Pickup {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long pickupId;

    private String areaCode;

    private String status;
}