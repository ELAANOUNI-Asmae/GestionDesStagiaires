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

public class Effectue {

    //id de la classe
    //id_stagiaire (FK + PK )

    //id_abscence ( FK )

    //Attributs
    private int nmb_abscence;
    private int prc_abscence;
}
