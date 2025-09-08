package com.GestionDesStagiaires.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

import java.time.LocalDate;
import java.util.List;

@Entity
@Getter @Setter @NoArgsConstructor

public class Projet {

    //id de la classe
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id_projet;

    //Attributs
    private String sujet_projet;
    private LocalDate date_debut_projet;
    private LocalDate date_fin_projet;
    private int nmb_livrables;

    //id_encadrant ( FK )

    @OneToMany(mappedBy = "projet", cascade = CascadeType.ALL)
    private List<Compose> livrables;

}
