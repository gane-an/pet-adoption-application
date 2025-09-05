package com.example.pet_adoption_portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.Data;
import java.util.List;

@Entity
@Data
public class Pet {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String type;
    private String breed;
    private int age;
    private String city;
    private String status;   // AVAILABLE, ADOPTED
    private String owner;

    @OneToMany(mappedBy = "pet", cascade = CascadeType.ALL)
    @JsonIgnore   // ✅ Prevent infinite JSON recursion
    private List<Application> applications;
}
