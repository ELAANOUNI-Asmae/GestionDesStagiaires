// Supervisors.tsx

export interface Supervisor {
  id: number;
  firstName: string;
  lastName: string;
  department: string;
}

export const mockSupervisors: Supervisor[] = [
  {
    id: 1,
    firstName: "John",
    lastName: "Manager",
    department: "Développement Logiciel",
  },
  {
    id: 2,
    firstName: "Jane",
    lastName: "Doe",
    department: "Développement Logiciel",
  },
  {
    id: 3,
    firstName: "Mike",
    lastName: "Ross",
    department: "Science des Données",
  },
  {
    id: 4,
    firstName: "Sarah",
    lastName: "Connor",
    department: "Développement Logiciel",
  },
  {
    id: 5,
    firstName: "Chris",
    lastName: "Evans",
    department: "Science des Données",
  },
  {
    id: 6,
    firstName: "Laura",
    lastName: "Croft",
    department: "Cybersécurité",
  },
  {
    id: 7,
    firstName: "David",
    lastName: "Lee",
    department: "Biotechnologie",
  },
  {
    id: 8,
    firstName: "Jessica",
    lastName: "Alba",
    department: "Développement Logiciel",
  },
  {
    id: 9,
    firstName: "Robert",
    lastName: "Downey",
    department: "Finance",
  },
  {
    id: 10,
    firstName: "Emily",
    lastName: "Blunt",
    department: "IT Santé",
  },
  // Vous pouvez ajouter d'autres encadrants ici.
];