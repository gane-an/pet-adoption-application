package com.example.pet_adoption_portal.controller;

import com.example.pet_adoption_portal.entity.Application;
import com.example.pet_adoption_portal.service.ApplicationService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/applications")
public class ApplicationController {
    private final ApplicationService appService;

    @GetMapping
    public List<Application> list() {
        return appService.list();
    }

    @PostMapping
    public Application apply(@RequestBody Application application) {
        return appService.apply(application);
    }

    @PutMapping("/{id}")
    public Application updateStatus(@PathVariable Long id, @RequestParam String status) {
        return appService.updateStatus(id, status);
    }
}
