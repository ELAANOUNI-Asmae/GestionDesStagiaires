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

public class Departement {

    //id de la classe
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private long id_dep;

    //Attributs
    private String nom_dep;

}
