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

public class Groupe {

    //Identifiateur
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_grp;

    //Attributs
    private String nom_grp;

}
