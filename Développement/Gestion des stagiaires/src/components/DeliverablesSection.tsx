// src/components/DeliverablesSection.tsx
import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CheckCircle2, ChevronDown, ChevronUp } from "lucide-react";
import { Progress } from "@/components/ui/progress"; // Import for Progress component
import { Label } from "@/components/ui/label"; // Import for Label component
import { mockInterns } from "./InternsSection"; // Used for getUniqueYears
import { isInternActiveInMonthAndYear, getUniqueYears } from "./ProjectsSection"; // Re-use from ProjectsSection

// Interface pour la structure d'un livrable
interface Deliverable {
  id: number;
  label: string;
  deadline: string;
  isCompleted: boolean;
  deliveryDate?: string;
}

// Interface pour la structure d'un projet
interface Project {
  name: string;
  deliverables: Deliverable[];
}

// Données statiques : voici la liste des projets avec leurs livrables
export const existingProjects: Project[] = [
  {
    name: "Projet Alpha : Développement d'une application mobile",
    deliverables: [
      { id: 1, label: "Rapport d'analyse de marché", deadline: "2025-08-15", isCompleted: false },
      { id: 2, label: "Prototype de l'interface utilisateur", deadline: "2025-09-01", isCompleted: true, deliveryDate: "2025-08-30" },
      { id: 3, label: "Tests utilisateurs et retours", deadline: "2025-09-15", isCompleted: false },
    ],
  },
  {
    name: "Projet Beta : Site web pour la gestion de projets",
    deliverables: [
      { id: 4, label: "Spécifications techniques", deadline: "2025-07-20", isCompleted: true, deliveryDate: "2025-07-18" },
      { id: 5, label: "Maquettes UI/UX", deadline: "2025-08-01", isCompleted: false },
    ],
  },
  {
    name: "Projet Gamma : Refonte du système interne",
    deliverables: [
      { id: 6, label: "Audit des systèmes existants", deadline: "2025-09-01", isCompleted: false },
      { id: 7, label: "Proposition d'architecture", deadline: "2025-09-10", isCompleted: false },
      { id: 8, label: "Implémentation du module A", deadline: "2025-10-01", isCompleted: true, deliveryDate: "2025-09-28" },
    ],
  },
  {
    name: "Projet Delta : Recherche et développement IA",
    deliverables: [
      { id: 9, label: "Revue de littérature", deadline: "2025-07-25", isCompleted: true, deliveryDate: "2025-07-22" },
      { id: 10, label: "Expérimentation initiale", deadline: "2025-08-05", isCompleted: false },
    ],
  },
];

// Fonction utilitaire pour déterminer le statut de livraison d'un livrable
const getDeliveryStatus = (deadline: string, deliveryDate?: string) => {
  if (!deliveryDate) return "pending";
  const deadlineDate = new Date(deadline);
  const deliveredDate = new Date(deliveryDate);
  return deliveredDate <= deadlineDate ? "on-time" : "late";
};

// Composant pour afficher le badge de statut
const StatusBadge = ({ status }: { status: "on-time" | "late" | "pending" }) => {
  let colorClass = "";
  let text = "";
  switch (status) {
    case "on-time":
      colorClass = "bg-green-100 text-green-800";
      text = "À temps";
      break;
    case "late":
      colorClass = "bg-red-100 text-red-800";
      text = "En retard";
      break;
    case "pending":
    default:
      colorClass = "bg-gray-100 text-gray-800";
      text = "En attente";
      break;
  }
  return <span className={`ml-2 px-2.5 py-0.5 rounded-full text-xs font-medium ${colorClass}`}>{text}</span>;
};

export const DeliverablesSection = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [expandedProjects, setExpandedProjects] = useState<Set<string>>(new Set());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1); // Mois actuel par défaut
  const [selectedYear, setSelectedYear] = useState<number>(new Date().getFullYear()); // Année actuelle par défaut

  const uniqueYears = useMemo(() => getUniqueYears(), []);

  const months = [
    { value: 1, label: "Janvier" }, { value: 2, label: "Février" },
    { value: 3, label: "Mars" }, { value: 4, label: "Avril" },
    { value: 5, label: "Mai" }, { value: 6, label: "Juin" },
    { value: 7, label: "Juillet" }, { value: 8, label: "Août" },
    { value: 9, label: "Septembre" }, { value: 10, label: "Octobre" },
    { value: 11, label: "Novembre" }, { value: 12, label: "Décembre" },
  ];

  const filteredProjects = useMemo(() => {
    return existingProjects
      .filter((project) => {
        // Filtrer les projets basés sur la recherche
        const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtrer les projets/livrables basés sur le mois et l'année
        // Un projet est considéré actif si au moins un de ses livrables a une date butoir ou de livraison dans le mois/année sélectionné
        const hasActiveDeliverable = project.deliverables.some(deliverable => {
            const deadlineDate = new Date(deliverable.deadline);
            const deliveryDate = deliverable.deliveryDate ? new Date(deliverable.deliveryDate) : null;

            const isDeadlineInPeriod = deadlineDate.getMonth() + 1 === selectedMonth && deadlineDate.getFullYear() === selectedYear;
            const isDeliveryInPeriod = deliveryDate && deliveryDate.getMonth() + 1 === selectedMonth && deliveryDate.getFullYear() === selectedYear;

            // Also consider projects if interns associated with them are active in the selected month/year
            // This requires linking projects to interns, which is not directly in existingProjects.
            // For now, we'll focus on deliverable dates. If projects were linked to interns via an ID,
            // we could do a more robust filter here using mockInterns.
            const isProjectActiveThroughInterns = mockInterns.some(intern =>
                intern.project === project.name && isInternActiveInMonthAndYear(intern, selectedMonth, selectedYear)
            );


            return matchesSearch && (isDeadlineInPeriod || isDeliveryInPeriod || isProjectActiveThroughInterns);
        });

        return matchesSearch && hasActiveDeliverable;
      })
      .map(project => {
        // Calculate progress for each filtered project
        const completedDeliverables = project.deliverables.filter(d => d.isCompleted).length;
        const totalDeliverables = project.deliverables.length;
        const progress = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

        return {
            ...project,
            completedDeliverables,
            totalDeliverables,
            progress
        };
      });
  }, [searchTerm, selectedMonth, selectedYear]);

  const toggleProjectExpansion = (projectName: string) => {
    setExpandedProjects((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(projectName)) {
        newSet.delete(projectName);
      } else {
        newSet.add(projectName);
      }
      return newSet;
    });
  };

  const handleCheckboxChange = (projectId: number, deliverableId: number) => {
    // Logic to update deliverable status (mocked for now)
    // In a real application, you would update your backend here.
    console.log(`Deliverable ${deliverableId} of Project ${projectId} checked/unchecked.`);
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-3xl font-bold text-gray-900">Gestion des Livrables</h1>

      {/* Barre de recherche et filtres de mois/année */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <Input
          type="text"
          placeholder="Rechercher par nom de projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="max-w-sm"
        />
        <div className="flex items-center gap-2">
          <Label htmlFor="month-select" className="sr-only">Mois</Label>
          <select
            id="month-select"
            value={selectedMonth}
            onChange={(e) => setSelectedMonth(parseInt(e.target.value))}
            className="p-2 border rounded-md"
          >
            {months.map((month) => (
              <option key={month.value} value={month.value}>
                {month.label}
              </option>
            ))}
          </select>

          <Label htmlFor="year-select" className="sr-only">Année</Label>
          <select
            id="year-select"
            value={selectedYear}
            onChange={(e) => setSelectedYear(parseInt(e.target.value))}
            className="p-2 border rounded-md"
          >
            {uniqueYears.map((year) => (
              <option key={year} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Liste des projets avec livrables */}
      {filteredProjects.length > 0 ? (
        <div className="grid gap-6">
          {filteredProjects.map((project) => (
            <Card key={project.name} className="overflow-hidden">
              <CardHeader className="flex flex-row items-center justify-between p-4 bg-gray-50">
                <CardTitle className="text-lg font-semibold">{project.name}</CardTitle>
                <div className="flex items-center gap-2">
                    <div className="text-sm text-gray-600">
                        {project.completedDeliverables}/{project.totalDeliverables} livrables terminés
                    </div>
                    <Progress value={project.progress} className="w-24" />
                  <button
                    onClick={() => toggleProjectExpansion(project.name)}
                    className="p-2 rounded-full hover:bg-gray-200"
                    aria-expanded={expandedProjects.has(project.name)}
                    aria-label={expandedProjects.has(project.name) ? "Réduire" : "Développer"}
                  >
                    {expandedProjects.has(project.name) ? (
                      <ChevronUp className="w-5 h-5 text-gray-600" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-600" />
                    )}
                  </button>
                </div>
              </CardHeader>
              {expandedProjects.has(project.name) && (
                <CardContent className="p-4 border-t">
                  {project.deliverables.length > 0 ? (
                    <div className="space-y-4">
                      {project.deliverables.map((deliverable) => (
                        <div key={deliverable.id} className="flex items-start">
                          <div className="flex items-center">
                            <Checkbox
                              id={`deliverable-${deliverable.id}`}
                              checked={deliverable.isCompleted}
                              onCheckedChange={() => handleCheckboxChange(project.id, deliverable.id)}
                              className="mr-2"
                            />
                            <div className="grid gap-1.5 leading-none">
                              <label
                                htmlFor={`deliverable-${deliverable.id}`}
                                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                              >
                                {deliverable.label}
                              </label>
                              <p className="text-sm text-gray-500 ml-6">
                                ID: {deliverable.id} | Échéance: {deliverable.deadline}
                              </p>
                              {deliverable.isCompleted && deliverable.deliveryDate && (
                                <p className="text-sm ml-6 font-medium flex items-center">
                                  Livré le: {deliverable.deliveryDate}
                                  <StatusBadge status={getDeliveryStatus(deliverable.deadline, deliverable.deliveryDate)} />
                                </p>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-gray-600">Aucun livrable pour ce projet.</p>
                  )}
                </CardContent>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <Card>
          <CardContent>
            <p className="text-gray-600">Aucun projet avec livrables n'a été trouvé.</p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};