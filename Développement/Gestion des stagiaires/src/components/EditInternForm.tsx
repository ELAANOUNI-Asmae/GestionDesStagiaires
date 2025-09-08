import { useState } from "react";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Intern } from "./types"; // Importez l'interface depuis le nouveau fichier
import { Checkbox } from "@/components/ui/checkbox"; // Import the Checkbox component
import { FormData } from "./AddInternForm";

interface EditInternFormProps {
  intern: Intern;
  onCancel: () => void;
  onSave: (updatedIntern: Intern) => void;
}

export const EditInternForm = ({ intern, onCancel, onSave }: EditInternFormProps) => {
  const [formData, setFormData] = useState(intern);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setFormData(prevData => ({
      ...prevData,
      _status: checked ? "Confirmed" : "Inconfirmed",
      get status() {
        return this._status;
      },
      set status(value) {
        this._status = value;
      },
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(formData);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <Button variant="outline" onClick={onCancel}>
          <ArrowLeft className="w-4 h-4 mr-2" /> Retour
        </Button>
        <h2 className="text-2xl font-bold">Modifier les informations de {intern.name}</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Ligne 1 : Nom et Email */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom Complet</Label>
              <Input
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
        </div>

        {/* Ligne 2 : Téléphone et École */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="phone">Téléphone</Label>
              <Input
                id="phone"
                name="phone"
                type="tel"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            
        </div>

        {/* Ligne 3 : Type de stage et Département */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="internship">Type de Stage</Label>
              <select
                id="internship"
                name="internship"
                value={formData.internship}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="PFA">PFA</option>
                <option value="PFE">PFE</option>
                <option value="Initiation">Initiation</option>
                <option value="Application">Application</option>
                <option value="Observation">Observation</option>
              </select>
            </div>
            
        </div>

        {/* Ligne 4 : Dates de début et de fin */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de Début</Label>
              <Input
                id="startDate"
                name="startDate"
                type="date"
                value={formData.startDate}
                onChange={handleChange}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de Fin</Label>
              <Input
                id="endDate"
                name="endDate"
                type="date"
                value={formData.endDate}
                onChange={handleChange}
              />
            </div>
        </div>

        {/* Ligne 5 : Statut et Projet */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="status">Statut</Label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <option value="Confirmed">Confirmé</option>
                <option value="Inconfirmed">Non Confirmé</option>
                <option value="Completed">Terminé</option>
              </select>
              {intern.status === "Non confirmé" && (
                <div className="flex items-center space-x-2 mt-2">
                  <Checkbox
                    id="confirm-intern"
                    checked={false}
                    onCheckedChange={handleCheckboxChange}
                  />
                  <label
                    htmlFor="confirm-intern"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    Confirmer le stagiaire
                  </label>
                </div>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="project">Projet</Label>
              <Input
                id="project"
                name="project"
                value={formData.project}
                onChange={handleChange}
              />
            </div>
        </div>

        {/* Ligne 6 : Superviseurs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="companySupervisor">Superviseur de l'entreprise</Label>
              <Input
                id="companySupervisor"
                name="companySupervisor"
                value={formData.companySupervisor}
                onChange={handleChange}
              />
            </div>
        </div>

        <div className="flex space-x-2">
          <Button type="submit">Sauvegarder les modifications</Button>
          <Button type="button" variant="outline" onClick={onCancel}>Annuler</Button>
        </div>
      </form>
    </div>
  );
};