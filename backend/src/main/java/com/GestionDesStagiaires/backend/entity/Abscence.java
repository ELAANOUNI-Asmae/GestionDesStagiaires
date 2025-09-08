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

public class Abscence {

    //id de la classe
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id_abscence;

    //Attributs
    private LocalDate date_abscence;
    private String just_abscence;

}
