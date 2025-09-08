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

public class Gere {

    //id de la classe
    //id_user (FK + PK )

    //id_stagiaire ( FK )

    //Attributs
    private int nmb_stagiaires;
}
