package com.GestionDesStagiaires.backend.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.OneToMany;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Entity
@Getter @Setter @NoArgsConstructor

public class Encadrant {

    //Identifiateur
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_encadrant;

    //Attributs
    private String prenom_encadrant;
    private String nom_encadrant;

    //id_dep ( FK )


}
