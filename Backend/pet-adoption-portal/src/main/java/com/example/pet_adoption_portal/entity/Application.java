package com.example.pet_adoption_portal.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long petId;
    private String applicant;
    private String status;  // pending, approved, rejected
}
