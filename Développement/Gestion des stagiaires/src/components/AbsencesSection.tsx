import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { mockInterns } from "./InternsSection";
import { mockAbsences, Absence } from "./mockAbsences";
import { Intern } from "./types";
import { ArrowLeft, Calendar, XCircle, AlertCircle } from "lucide-react";

// Fonction utilitaire pour vérifier si une date est un week-end
const isWeekend = (date: Date): boolean => {
  const day = date.getDay();
  return day === 0 || day === 6; // 0 = Dimanche, 6 = Samedi
};

// Liste statique de jours fériés (format YYYY-MM-DD)
const getPublicHolidays = (): string[] => {
  return [
    "2024-01-01", "2024-01-11", "2024-04-10", "2024-04-11", "2024-05-01",
    "2024-06-17", "2024-06-18", "2024-07-07", "2024-07-30", "2024-08-14",
    "2024-08-20", "2024-08-21", "2024-09-15", "2024-11-06", "2024-11-18",
    "2025-01-01",
  ];
};

// Fonction pour calculer la limite d'absence basée sur la formule
const calculateAbsenceLimit = (startDate: string, endDate: string): number => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  const holidays = getPublicHolidays();
  
  let totalDays = 0;
  let nonWorkingDays = 0;
  
  const currentDate = new Date(start);
  while (currentDate <= end) {
    const formattedDate = currentDate.toISOString().slice(0, 10);
    if (isWeekend(currentDate) || holidays.includes(formattedDate)) {
      nonWorkingDays++;
    }
    totalDays++;
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  const workingDays = totalDays - nonWorkingDays;
  const limit = workingDays * 0.2;
  
  // Arrondi à l'entier supérieur
  return Math.ceil(limit);
};

// Nouvelle fonction pour déterminer la couleur et le pourcentage d'absence
const getAbsenceInfo = (intern: Intern) => {
  const internAbsencesCount = intern.absences;
  const limit = calculateAbsenceLimit(intern.startDate, intern.endDate);
  
  const percentage = limit > 0 ? Math.round((internAbsencesCount / limit) * 100) : 0;
  
  let colorClass = "";
  if (percentage >= 100) {
    colorClass = "text-red-500";
  } else if (percentage >= 50) {
    colorClass = "text-yellow-500";
  } else {
    colorClass = "text-green-500";
  }

  return { percentage, colorClass };
};


export const AbsencesSection = () => {
  // Création d'un état local pour les stagiaires
  const [interns, setInterns] = useState<Intern[]>(mockInterns as Intern[]);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterDepartment, setFilterDepartment] = useState("all");
  const [filterGroup, setFilterGroup] = useState("all");
  
  // Nouveaux états pour la fonctionnalité d'ajout
  const [showAddAbsenceForm, setShowAddAbsenceForm] = useState(false);
  const [newAbsenceDate, setNewAbsenceDate] = useState("");
  const [newAbsenceJustification, setNewAbsenceJustification] = useState("");
  const [localAbsences, setLocalAbsences] = useState<Absence[]>(mockAbsences);

  const internAbsences = useMemo(() => {
    if (!selectedIntern) return [];
    return localAbsences.filter(
      (absence) => absence.internId === selectedIntern.id
    );
  }, [selectedIntern, localAbsences]);
  
  const absenceLimit = useMemo(() => {
    if (!selectedIntern) return 0;
    return calculateAbsenceLimit(selectedIntern.startDate, selectedIntern.endDate);
  }, [selectedIntern]);

  const hasExceededLimit = internAbsences.length > absenceLimit;

  // Créer des listes uniques pour les sélecteurs de filtre
  const projects = useMemo(() => {
    const uniqueProjects = Array.from(new Set(interns.map(intern => intern.project)));
    return ["all", ...uniqueProjects];
  }, [interns]);
  
  // Filtrer la liste des stagiaires en fonction des filtres
  const filteredInterns = useMemo(() => {
    const filtered = interns.filter((intern) => {
      const matchesName = intern.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesName ;
    });

    // Tri par ordre décroissant de pourcentage d'absence
    return filtered.sort((a, b) => {
      const percentageA = getAbsenceInfo(a).percentage;
      const percentageB = getAbsenceInfo(b).percentage;
      return percentageB - percentageA;
    });
  }, [searchTerm, filterDepartment, filterGroup, interns]);

  // Gérer l'ajout d'une nouvelle absence
  const handleAddAbsence = () => {
    if (!selectedIntern || !newAbsenceDate || !newAbsenceJustification) {
      alert("Veuillez remplir tous les champs.");
      return;
    }
    
    // Convertir les chaînes de caractères en objets Date pour la comparaison
    const absenceDate = new Date(newAbsenceDate);
    const internStartDate = new Date(selectedIntern.startDate);
    const internEndDate = new Date(selectedIntern.endDate);

    // Valider que la date d'absence est dans la plage du stage
    if (absenceDate < internStartDate || absenceDate > internEndDate) {
      alert("La date d'absence doit être comprise entre le début et la fin du stage.");
      return;
    }

    // Simuler l'ajout d'une absence
    const newAbsence: Absence = {
      id: Date.now(),
      internId: selectedIntern.id,
      date: newAbsenceDate,
      justification: newAbsenceJustification,
    };
    
    // Mettre à jour le nombre d'absences du stagiaire
    setInterns(prevInterns => 
      prevInterns.map(intern => 
        intern.id === selectedIntern.id
          ? { ...intern, absences: intern.absences + 1 }
          : intern
      )
    );
    
    // Mettre à jour la liste des absences
    setLocalAbsences((prevAbsences) => [...prevAbsences, newAbsence]);
    
    // Mettre à jour l'objet selectedIntern pour forcer la mise à jour du composant
    if (selectedIntern) {
        setSelectedIntern({ ...selectedIntern, absences: selectedIntern.absences + 1 });
    }

    setShowAddAbsenceForm(false); // Cacher le formulaire après l'ajout
    setNewAbsenceDate(""); // Réinitialiser le champ de date
    setNewAbsenceJustification(""); // Réinitialiser le champ de justification
  };


  if (selectedIntern) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between space-x-4">
          <div className="flex items-center space-x-4">
            <Button variant="outline" onClick={() => setSelectedIntern(null)}>
              <ArrowLeft className="w-4 h-4 mr-2" /> Retour à la liste
            </Button>
            <h2 className="text-2xl font-bold">
              Absences de {selectedIntern.name}
            </h2>
          </div>
          <Button onClick={() => setShowAddAbsenceForm(true)}>Ajouter une absence</Button>
        </div>

        {showAddAbsenceForm && (
          <Card className="p-4">
            <CardHeader className="p-0 mb-4">
              <CardTitle className="text-lg">Nouvelle absence</CardTitle>
            </CardHeader>
            <CardContent className="p-0 space-y-4">
              <Input
                type="date"
                placeholder="Date de l'absence"
                value={newAbsenceDate}
                onChange={(e) => setNewAbsenceDate(e.target.value)}
              />
              <Input
                placeholder="Justification"
                value={newAbsenceJustification}
                onChange={(e) => setNewAbsenceJustification(e.target.value)}
              />
              <div className="flex justify-end space-x-2">
                <Button variant="outline" onClick={() => setShowAddAbsenceForm(false)}>Annuler</Button>
                <Button onClick={handleAddAbsence}>Enregistrer</Button>
              </div>
            </CardContent>
          </Card>
        )}

        {internAbsences.length > 0 ? (
          <Card>
            <CardHeader>
              <CardTitle>Détails des absences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {internAbsences.map((absence) => (
                  <div key={absence.id} className="flex items-start space-x-4 border-b pb-4 last:border-b-0 last:pb-0">
                    <div className="flex-shrink-0">
                      <XCircle className="w-6 h-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="font-medium">Date: {absence.date}</p>
                      <p className="text-sm text-gray-500 mt-1">Justification: {absence.justification}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Aucune absence enregistrée pour ce stagiaire.</p>
            </CardContent>
          </Card>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des absences</h2>
      <div className="flex space-x-4">
        {/* Champ de recherche par nom */}
        <Input
          placeholder="Rechercher par nom..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        {/* Sélecteur de département */}
        <select
          value={filterDepartment}
          onChange={(e) => setFilterDepartment(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm max-w-xs"
        >
          {projects.map(dep => (
            <option key={dep} value={dep}>
              {dep === "all" ? "Tous les départements" : dep}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-4">
        {filteredInterns.length > 0 ? (
          filteredInterns.map((intern) => {
            const { percentage, colorClass } = getAbsenceInfo(intern as Intern);
            return (
              <div
                key={intern.id}
                className={`flex items-center justify-between p-4 border rounded-md cursor-pointer hover:shadow-md transition-shadow`}
                onClick={() => setSelectedIntern(intern as Intern)}
              >
                <div className="flex items-center space-x-4 flex-1">
                  <div className="font-semibold text-lg flex items-center">
                    <span>{intern.name}</span>
                    {percentage >= 100 && (
                      <AlertCircle className="w-5 h-5 ml-2 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-gray-700">
                    <Calendar className="w-4 h-4 text-gray-500" />
                    <span>{intern.startDate} - {intern.endDate}</span>
                  </div>
                  <Badge variant="secondary">Département: {intern.project}</Badge>
                  <div className="font-semibold">
                    <span className={`font-bold ${colorClass}`}>
                      {percentage}%
                    </span>
                    <span className="ml-1 text-gray-700">d'absence</span>
                  </div>
                </div>
                
                <div className="flex space-x-2">
                  {percentage >= 60 && percentage <= 80 && (
                    <a href={`mailto:${intern.email}?subject=Alerte%20concernant%20vos%20absences`}>
                      <Button size="sm">
                        Envoyer une alerte
                      </Button>
                    </a>
                  )}
                  {percentage > 80 && (
                    <a href={`mailto:${intern.email}?subject=Alerte%20URGENTE%20concernant%20vos%20absences`}>
                      <Button size="sm" variant="destructive">
                        Urgence
                      </Button>
                    </a>
                  )}
                </div>
              </div>
            );
          })
        ) : (
          <Card>
            <CardContent className="text-center py-8">
              <p className="text-gray-500">Aucun stagiaire trouvé correspondant aux critères.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};