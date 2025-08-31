package com.example.pet_adoption_portal.controller;

import com.example.pet_adoption_portal.entity.Pet;
import com.example.pet_adoption_portal.service.PetService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/pets")
public class PetController {
    private final PetService petService;

    @GetMapping
    public List<Pet> list() {
        return petService.list();
    }

    @GetMapping("/{id}")
    public Pet get(@PathVariable Long id) {
        return petService.get(id);
    }

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Pet create(@RequestBody Pet pet) {
        return petService.create(pet);
    }

    @PutMapping("/{id}")
    public Pet update(@PathVariable Long id, @RequestBody Pet pet, @RequestParam String owner) {
        return petService.update(id, pet, owner);
    }

    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void delete(@PathVariable Long id, @RequestParam String owner) {
        petService.delete(id, owner);
    }
}
