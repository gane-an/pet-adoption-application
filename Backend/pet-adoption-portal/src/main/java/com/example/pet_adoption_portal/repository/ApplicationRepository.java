package com.example.pet_adoption_portal.repository;

import com.example.pet_adoption_portal.entity.Application;
import com.example.pet_adoption_portal.entity.Pet;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ApplicationRepository extends JpaRepository<Application, Long> {

    // Find all applications for a given pet
    List<Application> findByPet(Pet pet);

    // Find all applications by a specific applicant
    List<Application> findByApplicant(String applicant);

    // Check if a user already applied for the same pet
    boolean existsByPetAndApplicant(Pet pet, String applicant);
}
