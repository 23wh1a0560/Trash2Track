package com.trash2track.dto;

public class WorkerRouteStop {

    private String type;
    private String name;
    private double latitude;
    private double longitude;

    public WorkerRouteStop(String type, String name, double latitude, double longitude) {
        this.type = type;
        this.name = name;
        this.latitude = latitude;
        this.longitude = longitude;
    }

    public String getType() {
        return type;
    }

    public String getName() {
        return name;
    }

    public double getLatitude() {
        return latitude;
    }

    public double getLongitude() {
        return longitude;
    }
}