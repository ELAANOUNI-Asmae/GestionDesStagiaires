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

public class Utilisateur {

    //id de la classe
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id_user;

    //Attributs
    private String user_name;
    private String user_email;
    private String user_clef;

}
