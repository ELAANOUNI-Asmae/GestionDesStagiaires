import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Calendar } from "@/components/ui/calendar";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon, Info } from "lucide-react";
import { format, differenceInDays } from "date-fns";
import { cn } from "@/lib/utils";
import { FormData, InternType } from "../AddInternForm";
import { Card, CardContent } from "@/components/ui/card";

interface InternshipDetailsSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

const internshipTypes: { value: InternType; label: string; description: string }[] = [
  { value: "PFA", label: "PFA (Projet de Fin d'Année)", description: "Stage de projet de fin d'année" },
  { value: "PFE", label: "PFE (Projet de Fin d'Étude)", description: "Stage de projet de fin d'études" },
  { value: "Initiation", label: "Initiation", description: "Stage d'introduction au milieu professionnel" },
  { value: "Application", label: "Application", description: "Stage d'application des compétences" },
  { value: "Observation", label: "Observation", description: "Stage d'observation et d'apprentissage" },
];

export const InternshipDetailsSection = ({ formData, updateFormData, errors }: InternshipDetailsSectionProps) => {
  const calculateDuration = () => {
    if (formData.startDate && formData.endDate) {
      const days = differenceInDays(formData.endDate, formData.startDate);
      if (days > 0) {
        const weeks = Math.ceil(days / 7);
        return `${days} jours (${weeks} semaines)`;
      }
    }
    return "Sélectionnez les deux dates pour calculer la durée";
  };

  return (
    <div className="space-y-6">
      {/* Type de stage */}
      <div className="space-y-2">
        <Label htmlFor="internshipType" className="text-sm font-medium">
          Type de stage <span className="text-red-500">*</span>
        </Label>
        <Select 
          value={formData.internshipType} 
          onValueChange={(value: InternType) => updateFormData({ internshipType: value })}
        >
          <SelectTrigger className={errors.internshipType ? "border-red-500" : ""}>
            <SelectValue placeholder="Sélectionnez un type de stage" />
          </SelectTrigger>
          <SelectContent>
            {internshipTypes.map((type) => (
              <SelectItem key={type.value} value={type.value}>
                <div className="flex flex-col">
                  <span className="font-medium">{type.label}</span>
                  <span className="text-sm text-muted-foreground">{type.description}</span>
                </div>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        {errors.internshipType && (
          <p className="text-red-500 text-sm">{errors.internshipType}</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Date de début */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Date de début <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.startDate && "text-muted-foreground",
                  errors.startDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.startDate ? format(formData.startDate, "PPP") : "Choisir une date de début"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.startDate}
                onSelect={(date) => updateFormData({ startDate: date })}
                disabled={(date) => date < new Date()}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {errors.startDate && (
            <p className="text-red-500 text-sm">{errors.startDate}</p>
          )}
        </div>

        {/* Date de fin */}
        <div className="space-y-2">
          <Label className="text-sm font-medium">
            Date de fin <span className="text-red-500">*</span>
          </Label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !formData.endDate && "text-muted-foreground",
                  errors.endDate && "border-red-500"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {formData.endDate ? format(formData.endDate, "PPP") : "Choisir une date de fin"}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={formData.endDate}
                onSelect={(date) => updateFormData({ endDate: date })}
                disabled={(date) => date < new Date() || (formData.startDate && date <= formData.startDate)}
                initialFocus
                className="pointer-events-auto"
              />
            </PopoverContent>
          </Popover>
          {errors.endDate && (
            <p className="text-red-500 text-sm">{errors.endDate}</p>
          )}
        </div>
      </div>

      {/* Affichage de la durée */}
      <Card className="border-l-4 border-l-green-500">
        <CardContent className="p-4">
          <div className="flex items-center space-x-2">
            <Info className="w-4 h-4 text-green-500" />
            <Label className="text-sm font-medium">Durée</Label>
          </div>
          <p className="text-sm text-muted-foreground mt-1">
            {calculateDuration()}
          </p>
        </CardContent>
      </Card>

      {/* Superviseur en entreprise */}
      <div className="space-y-2">
        <Label htmlFor="companySupervisor" className="text-sm font-medium">
          Superviseur en entreprise <span className="text-red-500">*</span>
        </Label>
        <Input
          id="companySupervisor"
          value={formData.companySupervisor}
          onChange={(e) => updateFormData({ companySupervisor: e.target.value })}
          placeholder="Entrez le nom du superviseur"
          className={errors.companySupervisor ? "border-red-500" : ""}
        />
        {errors.companySupervisor && (
          <p className="text-red-500 text-sm">{errors.companySupervisor}</p>
        )}
      </div>
    </div>
  );
};