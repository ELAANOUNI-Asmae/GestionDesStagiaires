import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { format } from "date-fns";
import { FormData } from "../AddInternForm";
import { CheckCircle, User, Building, Calendar, FileText, Users, FolderOpen } from "lucide-react";

interface FormSummaryProps {
  formData: FormData;
}

export const FormSummary = ({ formData }: FormSummaryProps) => {
  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const start = formData.startDate;
      const end = formData.endDate;
      const diffTime = Math.abs(end.getTime() - start.getTime());
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      const weeks = Math.ceil(diffDays / 7);
      return `${diffDays} jours (${weeks} semaines)`;
    }
    return "Non calculé";
  };

  const getUploadedDocuments = () => {
    return Object.entries(formData.documents).filter(([_, file]) => file !== null);
  };

  return (
    <div className="space-y-6">
      {/* En-tête du résumé */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center space-x-2">
          <CheckCircle className="w-6 h-6 text-green-500" />
          <h3 className="text-xl font-semibold">Résumé de la candidature</h3>
        </div>
        <p className="text-muted-foreground">Veuillez vérifier toutes les informations avant de soumettre</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Informations personnelles */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <User className="w-5 h-5" />
              <span>Informations personnelles</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Nom complet</p>
                <p className="font-medium">{formData.firstName} {formData.lastName}</p>
              </div>
              <div>
                <p className="text-muted-foreground">CNI</p>
                <p className="font-medium">{formData.nationalId}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Email</p>
                <p className="font-medium">{formData.email}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Statut</p>
                <Badge variant={formData.isConfirmed ? "default" : "secondary"}>
                  {formData.isConfirmed ? "Confirmé" : "En attente"}
                </Badge>
              </div>
            </div>
            <Separator />
            <div className="space-y-2">
              <div>
                <p className="text-muted-foreground text-sm">Formation</p>
                <p className="font-medium">{formData.educationLevel} en {formData.specialization}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">École</p>
                <p className="font-medium">{formData.school}</p>
              </div>
              <div>
                <p className="text-muted-foreground text-sm">Superviseur académique</p>
                <p className="font-medium">{formData.schoolSupervisor}</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Détails du stage */}
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center space-x-2 text-lg">
              <Building className="w-5 h-5" />
              <span>Détails du stage</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <p className="text-muted-foreground text-sm">Type de stage</p>
              <Badge variant="outline" className="mt-1">
                {formData.internshipType}
              </Badge>
            </div>
            <Separator />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-muted-foreground" />
                <p className="text-muted-foreground text-sm">Durée</p>
              </div>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Date de début</p>
                  <p className="font-medium">
                    {formData.startDate ? format(formData.startDate, "PPP") : "Non définie"}
                  </p>
                </div>
                <div>
                  <p className="text-muted-foreground">Date de fin</p>
                  <p className="font-medium">
                    {formData.endDate ? format(formData.endDate, "PPP") : "Non définie"}
                  </p>
                </div>
              </div>
              <p className="text-sm text-blue-600 font-medium">
                Durée totale : {calculateDuration()}
              </p>
            </div>
            <Separator />
            <div>
              <p className="text-muted-foreground text-sm">Superviseur en entreprise</p>
              <p className="font-medium">{formData.companySupervisor}</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Affectation de groupe et projet */}
      {(formData.selectedGroupId || formData.selectedProjectId) && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {formData.selectedGroupId && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <Users className="w-5 h-5" />
                  <span>Affectation de groupe</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Groupe assigné</p>
                <p className="font-medium">ID du groupe : {formData.selectedGroupId}</p>
              </CardContent>
            </Card>
          )}

          {formData.selectedProjectId && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center space-x-2 text-lg">
                  <FolderOpen className="w-5 h-5" />
                  <span>Affectation de projet</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">Projet assigné</p>
                <p className="font-medium">ID du projet : {formData.selectedProjectId}</p>
              </CardContent>
            </Card>
          )}
        </div>
      )}

      {/* Documents téléchargés */}
      <Card>
        <CardHeader className="pb-3">
          <CardTitle className="flex items-center space-x-2 text-lg">
            <FileText className="w-5 h-5" />
            <span>Documents téléchargés</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {getUploadedDocuments().map(([key, file]) => (
              <div key={key} className="flex items-center space-x-3 p-2 bg-green-50 rounded-lg border border-green-200">
                <CheckCircle className="w-4 h-4 text-green-500" />
                <div>
                  <p className="text-sm font-medium">{file!.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(file!.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
            ))}
          </div>
          {getUploadedDocuments().length === 0 && (
            <p className="text-muted-foreground text-center py-4">Aucun document téléchargé</p>
          )}
        </CardContent>
      </Card>
    </div>
  );
};