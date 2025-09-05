package com.example.pet_adoption_portal.entity;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import jakarta.persistence.*;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class Application {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // relation to Pet
    @ManyToOne(optional = false, fetch = FetchType.EAGER)
    @JoinColumn(name = "pet_id", nullable = false)
    @JsonIgnoreProperties({"hibernateLazyInitializer", "handler"})
    private Pet pet;

    private String applicant;

    private String status;  // PENDING, APPROVED, REJECTED
}
