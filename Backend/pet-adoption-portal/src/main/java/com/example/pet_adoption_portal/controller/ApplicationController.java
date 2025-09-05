package com.example.pet_adoption_portal.controller;

import com.example.pet_adoption_portal.entity.Application;
import com.example.pet_adoption_portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/applications")
public class ApplicationController {
    private final ApplicationService appService;

    // List all applications
    @GetMapping
    public List<Application> list() {
        return appService.list();
    }

    // Create a new application
    @PostMapping
    public ResponseEntity<?> apply(@RequestBody Application application) {
        try {
            Application created = appService.apply(application);
            return ResponseEntity.status(HttpStatus.CREATED).body(created);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
        }
    }

    // Generic status update
    @PutMapping("/{id}")
    public ResponseEntity<?> updateStatus(@PathVariable Long id, @RequestParam String status) {
        try {
            Application updated = appService.updateStatus(id, status);
            return ResponseEntity.ok(updated);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // List applications for a specific pet
    @GetMapping("/pet/{petId}")
    public ResponseEntity<?> getByPet(@PathVariable Long petId) {
        try {
            List<Application> apps = appService.getByPet(petId);
            return ResponseEntity.ok(apps);
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        }
    }

    // List applications for a specific applicant (mine)
    // Accepts either header X-User or query param applicant (fallback to 'alice' if missing)
    @GetMapping("/mine")
    public List<Application> getByApplicant(
            @RequestHeader(value = "X-User", required = false) String headerUser,
            @RequestParam(value = "applicant", required = false) String applicant) {

        String user = (headerUser != null && !headerUser.isBlank()) ? headerUser
                : (applicant != null ? applicant : "alice");
        return appService.getByApplicant(user);
    }

    // Approve an application (only owner)
    @PutMapping("/{id}/approve")
    public ResponseEntity<?> approve(@PathVariable Long id, @RequestParam String owner) {
        try {
            appService.approve(id, owner);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            // Use 403 for permission/conflict style messages
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }

    // Reject an application (only owner)
    @PutMapping("/{id}/reject")
    public ResponseEntity<?> reject(@PathVariable Long id, @RequestParam String owner) {
        try {
            appService.reject(id, owner);
            return ResponseEntity.noContent().build();
        } catch (IllegalStateException e) {
            return ResponseEntity.status(HttpStatus.FORBIDDEN).body(e.getMessage());
        }
    }
}
