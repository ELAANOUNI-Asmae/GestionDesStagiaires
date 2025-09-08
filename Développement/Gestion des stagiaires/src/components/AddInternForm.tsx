import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { ArrowLeft, ArrowRight, Save, Send } from "lucide-react";
import { PersonalInfoSection } from "./AddInternForm/PersonalInfoSection";
import { InternshipDetailsSection } from "./AddInternForm/InternshipDetailsSection";
import { GroupProjectSelector } from "./AddInternForm/GroupProjectSelector";
import { DocumentsUploadSection } from "./AddInternForm/DocumentsUploadSection";
import { FormSummary } from "./AddInternForm/FormSummary";
import { useToast } from "@/hooks/use-toast";

export type InternType = "PFA" | "PFE" | "Initiation" | "Application" | "Observation";

export interface FormData {
  // Informations personnelles
  lastName: string;
  firstName: string;
  nationalId: string;
  educationLevel: string;
  specialization: string;
  school: string;
  skills: string;
  schoolSupervisor: string;
  email: string;
  isConfirmed: boolean;
  
  // Détails du stage
  internshipType: InternType | "";
  startDate: Date | undefined;
  endDate: Date | undefined;
  companySupervisor: string;
  
  // Groupe et projet assigné
  selectedGroupId: string | undefined;
  selectedProjectId: string | undefined;
  
  // Documents
  documents: {
    cv: File | null;
    coverLetter: File | null;
    internshipRequest: File | null;
    internshipAgreement: File | null;
    nationalIdCopy: File | null;
  };
}

const initialFormData: FormData = {
  lastName: "",
  firstName: "",
  nationalId: "",
  educationLevel: "",
  specialization: "",
  school: "",
  skills: "",
  schoolSupervisor: "",
  email: "",
  isConfirmed: false,
  internshipType: "",
  startDate: undefined,
  endDate: undefined,
  companySupervisor: "",
  selectedGroupId: undefined,
  selectedProjectId: undefined,
  documents: {
    cv: null,
    coverLetter: null,
    internshipRequest: null,
    internshipAgreement: null,
    nationalIdCopy: null,
  },
};

const steps = [
  { id: 1, title: "Informations Personnelles", description: "Détails de base et éducation" },
  { id: 2, title: "Détails du Stage", description: "Type et dates du stage" },
  { id: 3, title: "Groupe & Projet", description: "Détails d'affectation" },
  { id: 4, title: "Téléchargement des Documents", description: "Documents requis" },
  { id: 5, title: "Vérification & Soumission", description: "Vérification finale" },
];

interface AddInternFormProps {
  onCancel: () => void;
}

export const AddInternForm = ({ onCancel }: AddInternFormProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const updateFormData = (updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
    // console.log("FormData mis à jour:", updates); // Vous pouvez décommenter si vous voulez voir les mises à jour en temps réel
  };

  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    // --- Début des logs de débogage pour validateStep ---
    console.log(`--- Démarrage validation Étape ${step} ---`);
    console.log("Current FormData used for validation:", formData);
    // --- Fin des logs de débogage ---

    if (step === 1) {
      if (!formData.lastName.trim()) { newErrors.lastName = "Le nom est requis"; console.log("Validation Failed: lastName (empty)"); }
      if (!formData.firstName.trim()) { newErrors.firstName = "Le prénom est requis"; console.log("Validation Failed: firstName (empty)"); }
      if (!formData.nationalId.trim()) { newErrors.nationalId = "L'identifiant national est requis"; console.log("Validation Failed: nationalId (empty)"); }
      if (!formData.educationLevel.trim()) { newErrors.educationLevel = "Le niveau d'éducation est requis"; console.log("Validation Failed: educationLevel (empty)"); }
      if (!formData.specialization.trim()) { newErrors.specialization = "La spécialisation est requise"; console.log("Validation Failed: specialization (empty)"); }
      
      // Ligne pour School Supervisor doit être COMMENTÉE ou SUPPRIMÉE pour qu'il ne soit pas obligatoire
      // if (!formData.schoolSupervisor.trim()) {
      //   newErrors.schoolSupervisor = "Le superviseur scolaire est requis";
      //   console.log("Validation Failed: schoolSupervisor (empty)");
      // }

      if (!formData.email.trim()) {
        newErrors.email = "L'email est requis";
        console.log("Validation Failed: email (empty)");
      } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
        newErrors.email = "Veuillez entrer une adresse email valide";
        console.log("Validation Failed: email (invalid format)");
      }
    }

    if (step === 2) {
      if (!formData.internshipType) {
        newErrors.internshipType = "Le type de stage est requis";
        console.log("Validation Failed: internshipType (empty)");
      }
      if (!formData.startDate) {
        newErrors.startDate = "La date de début est requise";
        console.log("Validation Failed: startDate (empty)");
      }
      if (!formData.endDate) {
        newErrors.endDate = "La date de fin est requise";
        console.log("Validation Failed: endDate (empty)");
      }
      if (!formData.companySupervisor.trim()) {
        newErrors.companySupervisor = "Le superviseur en entreprise est requis";
        console.log("Validation Failed: companySupervisor (empty)");
      }
      
      if (formData.startDate && formData.endDate && formData.startDate >= formData.endDate) {
        newErrors.endDate = "La date de fin doit être après la date de début";
        console.log("Validation Failed: endDate (before startDate)");
      }
    }

    if (step === 3) {
      // Group and project assignment validation is optional for now
      console.log("Validation: Step 3 (optional, no current rules)");
    }

    if (step === 4) {
      if (!formData.documents.cv) {
        newErrors.cv = "Le CV est requis";
        console.log("Validation Failed: documents.cv (empty)");
      }
      if (!formData.documents.coverLetter) {
        newErrors.coverLetter = "La lettre de motivation est requise";
        console.log("Validation Failed: documents.coverLetter (empty)");
      }
      if (!formData.documents.internshipRequest) {
        newErrors.internshipRequest = "La demande de stage est requise";
        console.log("Validation Failed: documents.internshipRequest (empty)");
      }
      if (!formData.documents.internshipAgreement) {
        newErrors.internshipAgreement = "La convention de stage est requise";
        console.log("Validation Failed: documents.internshipAgreement (empty)");
      }
      if (!formData.documents.nationalIdCopy) {
        newErrors.nationalIdCopy = "La copie de la carte d'identité est requise";
        console.log("Validation Failed: documents.nationalIdCopy (empty)");
      }
    }

    setErrors(newErrors);
    // --- Début des logs de débogage ---
    console.log("Erreurs détectées après validation (pour l'étape", step, "):", newErrors);
    const isValid = Object.keys(newErrors).length === 0;
    console.log(`Validation finale pour l'étape ${step}: ${isValid ? "SUCCÈS" : "ÉCHEC"}`);
    console.log(`--- Fin validation Étape ${step} ---`);
    // --- Fin des logs de débogage ---
    return isValid;
  };

  const handleNext = () => {
    // --- Log très important pour confirmer que handleNext est appelé ---
    console.log("-> Déclenchement de handleNext. Étape actuelle:", currentStep);
    // --- Fin du log ---

    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length));
      console.log("-> Validation réussie. Passage à l'étape suivante:", currentStep + 1);
    } else {
      console.log("-> Validation échouée. Reste sur l'étape actuelle:", currentStep);
    }
  };

  const handlePrevious = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    if (!validateStep(currentStep)) return;

    setIsSubmitting(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));
      toast({
        title: "Succès !",
        description: "Le nouveau stagiaire a été ajouté avec succès.",
      });
      onCancel(); // Close the form
    } catch (error) {
      toast({
        title: "Erreur",
        description: "Échec de la soumission du formulaire. Veuillez réessayer.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateProgress = () => {
    return (currentStep / steps.length) * 100;
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <PersonalInfoSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 2:
        return (
          <InternshipDetailsSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 3:
        return (
          <GroupProjectSelector
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 4:
        return (
          <DocumentsUploadSection
            formData={formData}
            updateFormData={updateFormData}
            errors={errors}
          />
        );
      case 5:
        return <FormSummary formData={formData} />;
      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Ajouter un Nouveau Stagiaire</h1>
          <p className="text-muted-foreground">Remplissez les informations requises étape par étape</p>
        </div>
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Annuler
        </Button>
      </div>

      {/* Progress Indicator */}
      <Card>
        <CardContent className="p-6">
          <div className="space-y-4">
            <div className="flex justify-between text-sm">
              <span>Étape {currentStep} sur {steps.length}</span>
              <span>{Math.round(calculateProgress())}% Terminé</span>
            </div>
            <Progress value={calculateProgress()} className="h-2" />
            <div className="grid grid-cols-5 gap-4">
              {steps.map((step) => (
                <div
                  key={step.id}
                  className={`text-center ${
                    step.id === currentStep
                      ? "text-primary font-medium"
                      : step.id < currentStep
                      ? "text-green-600"
                      : "text-muted-foreground"
                  }`}
                >
                  <div className="text-sm font-medium">{step.title}</div>
                  <div className="text-xs">{step.description}</div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Main Content */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-medium">
              {currentStep}
            </span>
            <span>{steps[currentStep - 1].title}</span>
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {renderStepContent()}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between items-center">

        <div className="flex space-x-2">
          {currentStep > 1 && (
            <Button variant="outline" onClick={handlePrevious}>
              <ArrowLeft className="w-4 h-4 mr-2" />
              Précédent
            </Button>
          )}
          
          {currentStep < steps.length ? (
            <Button onClick={handleNext}>
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              <Send className="w-4 h-4 mr-2" />
              {isSubmitting ? "Envoi en cours..." : "Soumettre la Demande"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};