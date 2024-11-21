package com.cognyte.eventmanager.event_manager_backend.service;

import com.cognyte.eventmanager.event_manager_backend.models.Event;
import com.cognyte.eventmanager.event_manager_backend.repository.EventRepository;
import jakarta.validation.Valid;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EventService {
    private final EventRepository eventRepository;

    public EventService(EventRepository eventRepository) {
        this.eventRepository = eventRepository;
    }
    public List<Event> findAll() {
        return eventRepository.findAll();
    }

    public Optional<Event> findById(Long id) {
        return eventRepository.findById(id);
    }

    public Event save(@Valid Event event) {
        if (event.getEndDate().isBefore(event.getStartDate())) {
            throw new IllegalArgumentException("End date cannot be before start date");
        }
        return eventRepository.save(event);
    }

    public void deleteById(Long id) {
        eventRepository.deleteById(id);
    }
}
