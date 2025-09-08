package com.GestionDesStagiaires.backend.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;

@Entity
@Getter @Setter @NoArgsConstructor

public class Compose {

    //id de la classe ( composite )
    @EmbeddedId
    private ComposeID id;

    //id_projet (FK + PK )
    @ManyToOne
    @MapsId("projetID")
    @JoinColumn(name = "id_projet")
    private Projet projet;

    //id_livrable ( FK )
    @ManyToOne
    @JoinColumn(name = "id_livrable")
    private Livrable livrable;

    //Attributs
    // nombre de livrable ivré
    private int nmb_livre;

}
