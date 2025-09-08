// src/types.tsx

import { Url } from "url";

export interface Intern {
  id: number;
  name: string;
  email: string;
  phone: string;
  internship: "PFA" | "PFE" | "Initiation" | "Application" | "Observation " | "Facultatif";
  startDate: string;
  endDate: string;
  depart
  status: "Confirmé" | "Non confirmé" | "Terminé"; // Statuts traduits
  companySupervisor: string;
  project: string;
  absences: number;
  profilePictureUrl: string;
 isReportSubmitted: boolean;
  reportSubmissionDate: string;
  isAttestationImported: boolean;
  attestationImportDate: string;
  cin : string ;
}

    
    
    
   