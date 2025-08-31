package com.example.pet_adoption_portal.service;

import com.example.pet_adoption_portal.entity.Application;
import com.example.pet_adoption_portal.repository.ApplicationRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository appRepo;

    public List<Application> list() {
        return appRepo.findAll();
    }

    public Application apply(Application application) {
        application.setStatus("pending");
        return appRepo.save(application);
    }

    public Application updateStatus(Long id, String status) {
        Application app = appRepo.findById(id).orElseThrow();
        app.setStatus(status);
        return appRepo.save(app);
    }
}
