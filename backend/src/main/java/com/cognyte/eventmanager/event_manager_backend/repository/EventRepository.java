package com.cognyte.eventmanager.event_manager_backend.repository;

import com.cognyte.eventmanager.event_manager_backend.models.Event;
import org.springframework.data.jpa.repository.JpaRepository;

public interface EventRepository extends JpaRepository<Event, Long> {
}
