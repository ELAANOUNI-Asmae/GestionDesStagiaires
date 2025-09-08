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

public class Livrable {

    //Identifiateur
    @Id
    @GeneratedValue (strategy = GenerationType.IDENTITY)
    private Long id_livrable;

    //Attributs
    private String titre_livrable;
    private LocalDate delai;
    private LocalDate date_livraison;

    @ManyToOne
    @JoinColumn(name = "livrable")
    private List<Compose> projets;

}
