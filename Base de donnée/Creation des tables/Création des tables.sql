
CREATE TABLE Utilisateur (
  id_user INT  AUTO_INCREMENT PRIMARY KEY,
  user_email VARCHAR(25) NOT NULL CHECK (user_email LIKE '%@gmail.com'),
  user_clef VARCHAR(25) NOT NULL
);

CREATE TABLE Notification (
  id_notif INT AUTO_INCREMENT PRIMARY KEY ,
  notif_date DATE NOT NULL ,
  notif_cont TEXT NOT NULL,
  id_user INT REFERENCES User(id_user)
);

CREATE TABLE Stagiaire (
  id_stagiaire INT AUTO_INCREMENT PRIMARY KEY ,
  prenom_stagiaire VARCHAR(25) NOT NULL,
  nom_stagiaire VARCHAR(25) NOT NULL,
  email_stagiaire VARCHAR(25) NOT NULL CHECK (email_stagiaire LIKE '%@gmail.com' OR '%@edu.uiz.ac.ma' ),
  nr_tel_stagiaire VARCHAR(25) NOT NULL CHECK (nr_tel_stagiaire LIKE '[05-06-07][0-9]{8}' ),
  ecole_stagiaire VARCHAR(25) ,
  encd_ecole_stagiaire VARCHAR(25) ,
  niveau_etudes_stagiaire VARCHAR(25) NOT NULL CHECK (niveau_etudes_stagiaire IN ("Licence", "Master", "Doctorat", "Diplôme", "Certificat")),
  specialite_stagiaire VARCHAR(25) NOT NULL,
  CIN_stagiaire VARCHAR(25) NOT NULL,
  stagiaire_confirme BOOLEAN DEFAULT FALSE,
  id_projet INT REFERENCES Projet(id_projet),
  id_encadrant INT REFERENCES Encadrant(id_encadrant)
);

CREATE TABLE Abscence (
  id_abscence INT AUTO_INCREMENT PRIMARY KEY ,
  date_abscence DATE NOT NULL ,
  just_abscence TEXT 
);

CREATE TABLE Document (
  id_doc INT AUTO_INCREMENT PRIMARY KEY ,
  titre_doc VARCHAR(25) NOT NULL,
  nature_doc VARCHAR(25) NOT NULL,
  lien_doc TEXT NOT NULL,
  id_stagiaire INT REFERENCES Stagiaire (id_stagiaire)
);

CREATE TABLE Encadrant (
  id_encadrant INT AUTO_INCREMENT PRIMARY KEY ,
  prenom_encadrant VARCHAR(25) NOT NULL ,
  nom_encadrant VARCHAR(25) NOT NULL ,
  id_dep INT REFERENCES Departement(id_dep)
);

CREATE TABLE Projet (
  id_projet INT AUTO_INCREMENT PRIMARY KEY ,
  prenom_projet VARCHAR(25) NOT NULL ,
  date_debut_projet DATE NOT NULL,
  date_fin_projet DATE NOT NULL,
  nmb_livrables INT NOT NULL,
  id_encadrant INT REFERENCES Supervisor(id_supervisor),
  CONSTRAINT CHECK (date_fin_projet > date_debut_projet)
);

CREATE TABLE Stage (
  id_stage INT AUTO_INCREMENT PRIMARY KEY ,
  type_stage VARCHAR(25) NOT NULL CHECK (type_stage IN ('Initiation', 'Application', 'Observation', 'PFA', 'PFE')),
  date_debut_stage DATE NOT NULL,
  date_fin_stage DATE NOT NULL,
  CONSTRAINT CHECK (date_fin_stage - date_debut_stage >= 22)
);

CREATE TABLE Groupe (
  id_grp INT AUTO_INCREMENT PRIMARY KEY ,
  nom_grp VARCHAR(25) NOT NULL
);

CREATE TABLE Departement (
  id_dep INT AUTO_INCREMENT PRIMARY KEY ,
  nom_dep VARCHAR(25) NOT NULL
);

CREATE TABLE Livrable (
  id_livrable INT AUTO_INCREMENT PRIMARY KEY ,
  titre_livrable VARCHAR(25) NOT NULL ,
  delai DATE NOT NULL ,
  date_livraison DATE NOT NULL
);

CREATE TABLE Effectue (
  id_stagiaire INT PRIMARY KEY REFERENCES Stagiaire(id_stagiaire) ,
  id_abscence INT REFERENCES Abscence(id_abscence),
  nmb_abscence INT ,
  prc_abscence INT
);

CREATE TABLE Gere (
  id_user INT PRIMARY KEY REFERENCES Utilisateur(id_user) ,
  id_stagiaire INT REFERENCES Stagiaire(id_stagiaire),
  nmb_stagiaires INT
);

CREATE TABLE Realise (
  id_stage INT PRIMARY KEY REFERENCES Stage(id_stage) ,
  id_stagiaire INT REFERENCES Stagiaire(id_stagiaire),
  duree_stage INT
);

CREATE TABLE Contient (
  id_grp INT PRIMARY KEY REFERENCES Groupe(id_grp) ,
  id_stagiaire INT REFERENCES Stagiaire(id_stagiaire),
  nmb_stagiaires_grp INT
);

CREATE TABLE Compose (
  id_projet INT PRIMARY KEY REFERENCES Projet(id_projet) ,
  id_livrable INT REFERENCES Livrable(id_livrable),
  nmb_livre INT
);

DROP TABLE document;
DROP TABLE abscence;
DROP TABLE stagiaire;
DROP TABLE stage;
DROP TABLE notification;
DROP TABLE projet;
DROP TABLE encadrant;
DROP TABLE utilisateur;
DROP TABLE effectue;
