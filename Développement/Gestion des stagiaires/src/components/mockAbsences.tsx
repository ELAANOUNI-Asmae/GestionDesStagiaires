// mockAbsences.tsx

export interface Absence {
  id: number;
  internId: number; // ID du stagiaire
  date: string;
  justification: string;
  status?: string; // Ajout optionnel pour un futur développement
}

export const mockAbsences: Absence[] = [
  {
    id: 1,
    internId: 1, // Alice Johnson
    date: "2024-03-10",
    justification: "Rendez-vous médical",
    status: "Validé"
  },
  {
    id: 2,
    internId: 1, // Alice Johnson
    date: "2024-03-11",
    justification: "Maladie",
    status: "Validé"
  },
  {
    id: 3,
    internId: 3, // Charlie Brown
    date: "2024-05-20",
    justification: "Problème familial",
    status: "En attente"
  },
  {
    id: 4,
    internId: 5, // Eve Adams
    date: "2024-04-05",
    justification: "Maladie",
    status: "Validé"
  },
  {
    id: 5,
    internId: 5, // Eve Adams
    date: "2024-04-06",
    justification: "Maladie",
    status: "Validé"
  },
  {
    id: 6,
    internId: 5, // Eve Adams
    date: "2024-04-07",
    justification: "Maladie",
    status: "Refusé"
  },
  {
    id: 7,
    internId: 7, // Grace Hall
    date: "2024-06-15",
    justification: "Formation personnelle",
    status: "En attente"
  },
  {
    id: 8,
    internId: 9, // Ivy Lynn
    date: "2024-02-28",
    justification: "Transport en panne",
    status: "Validé"
  }
];