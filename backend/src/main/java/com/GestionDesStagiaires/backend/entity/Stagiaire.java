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

public class Stagiaire {

    //id de la classe
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id_stagiaire;

    //Attributs
    private String prenom_stagiaire;
    private String nom_stagiaire;
    private String email_stagiaire;
    private String nr_tel_stagiaire;
    private String ecole_stagiaire;
    private String encd_ecole_stagiaire;
    private String niveau_etudes_stagiaire;
    private String specialite_stagiaire;
    private String CIN_stagiaire;
    private boolean stagiaire_confirme;

    //id_projet( FK )
    //id_encadrant ( FK )
}
