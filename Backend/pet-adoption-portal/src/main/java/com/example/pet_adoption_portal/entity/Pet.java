package com.example.pet_adoption_portal.entity;

import jakarta.persistence.*;
import lombok.Data;

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
    private String status;   // available, adopted
    private String owner;
}
