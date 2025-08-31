package com.example.pet_adoption_portal.service;

import com.example.pet_adoption_portal.entity.Pet;
import com.example.pet_adoption_portal.repository.PetRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class PetService {
    private final PetRepository petRepo;

    public List<Pet> list() {
        return petRepo.findAll();
    }

    public Pet get(Long id) {
        return petRepo.findById(id).orElseThrow();
    }

    public Pet create(Pet pet) {
        return petRepo.save(pet);
    }

    public Pet update(Long id, Pet updated, String owner) {
        Pet pet = get(id);
        if (!pet.getOwner().equals(owner)) throw new RuntimeException("Not allowed");
        pet.setName(updated.getName());
        pet.setBreed(updated.getBreed());
        pet.setAge(updated.getAge());
        pet.setCity(updated.getCity());
        pet.setStatus(updated.getStatus());
        return petRepo.save(pet);
    }

    public void delete(Long id, String owner) {
        Pet pet = get(id);
        if (!pet.getOwner().equals(owner)) throw new RuntimeException("Not allowed");
        petRepo.delete(pet);
    }
}
