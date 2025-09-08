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

public class Document {

    //Identifiateur
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_doc;

    //Attributs
    private String titre_doc;
    private String nature_doc;
    private String lien_doc;

    //id_stagiaire ( FK )



}
