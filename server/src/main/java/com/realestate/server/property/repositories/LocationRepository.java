package com.realestate.server.property.repositories;

import java.util.Optional;
import java.util.UUID;

import org.springframework.data.jpa.repository.JpaRepository;

import com.realestate.server.property.entities.Location;
import org.locationtech.jts.geom.Point;


public interface LocationRepository extends JpaRepository<Location, UUID> {
    
    Optional<Location> findByCoordinates(Point coordinates);
}
