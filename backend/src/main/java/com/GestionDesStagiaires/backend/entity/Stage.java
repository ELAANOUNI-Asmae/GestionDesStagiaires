package com.GestionDesStagiaires.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;

@Entity
@Getter @Setter @NoArgsConstructor

public class Stage {

    //Identifiateur
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_stage;

    //Attributs
    private String type_stage;
    private LocalDate date_debut_stage;
    private LocalDate date_fin_stage;

}
