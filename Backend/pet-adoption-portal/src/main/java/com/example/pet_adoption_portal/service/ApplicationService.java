package com.example.pet_adoption_portal.service;

import com.example.pet_adoption_portal.entity.Application;
import com.example.pet_adoption_portal.entity.Pet;
import com.example.pet_adoption_portal.repository.ApplicationRepository;
import com.example.pet_adoption_portal.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ApplicationService {
    private final ApplicationRepository appRepo;
    private final PetRepository petRepo;

    public List<Application> list() {
        return appRepo.findAll();
    }

    @Transactional
    public Application apply(Application application) {
        // validate pet exists and attach managed Pet entity
        Long petId = application.getPet() == null ? null : application.getPet().getId();
        if (petId == null) {
            throw new IllegalStateException("pet.id is required");
        }
        Pet pet = petRepo.findById(petId).orElseThrow(() -> new IllegalStateException("Pet not found: " + petId));

        String applicant = application.getApplicant();
        if (applicant == null || applicant.isBlank()) {
            throw new IllegalStateException("applicant is required");
        }

        // uniqueness check
        boolean exists = appRepo.existsByPetAndApplicant(pet, applicant);
        if (exists) {
            throw new IllegalStateException("You have already applied for this pet");
        }

        application.setPet(pet);
        application.setStatus("PENDING");
        return appRepo.save(application);
    }

    @Transactional
    public Application updateStatus(Long id, String status) {
        Application app = appRepo.findById(id).orElseThrow(() -> new IllegalStateException("Application not found: " + id));
        app.setStatus(status == null ? null : status.toUpperCase());
        return appRepo.save(app);
    }

    public List<Application> getByPet(Long petId) {
        Pet pet = petRepo.findById(petId).orElseThrow(() -> new IllegalStateException("Pet not found: " + petId));
        return appRepo.findByPet(pet);
    }

    public List<Application> getByApplicant(String applicant) {
        return appRepo.findByApplicant(applicant);
    }

    /**
     * Approve an application:
     *  - must be called by the pet owner
     *  - sets the application to APPROVED
     *  - sets the Pet status to ADOPTED
     *  - sets other PENDING applications for the same pet to REJECTED
     */
    @Transactional
    public void approve(Long id, String owner) {
        Application app = appRepo.findById(id).orElseThrow(() -> new IllegalStateException("Application not found: " + id));
        Pet pet = app.getPet();

        if (!pet.getOwner().equals(owner)) {
            throw new IllegalStateException("Only the pet owner can approve applications");
        }
        if (!"AVAILABLE".equalsIgnoreCase(pet.getStatus())) {
            throw new IllegalStateException("Pet is not available for adoption");
        }

        // Approve selected application
        app.setStatus("APPROVED");
        appRepo.save(app);

        // Mark pet as adopted
        pet.setStatus("ADOPTED");
        petRepo.save(pet);

        // Auto-reject other pending applications
        List<Application> others = appRepo.findByPet(pet);
        for (Application other : others) {
            if (!other.getId().equals(id) && "PENDING".equalsIgnoreCase(other.getStatus())) {
                other.setStatus("REJECTED");
                appRepo.save(other);
            }
        }
    }

    @Transactional
    public void reject(Long id, String owner) {
        Application app = appRepo.findById(id).orElseThrow(() -> new IllegalStateException("Application not found: " + id));
        Pet pet = app.getPet();

        if (!pet.getOwner().equals(owner)) {
            throw new IllegalStateException("Only the pet owner can reject applications");
        }

        app.setStatus("REJECTED");
        appRepo.save(app);
    }
}
