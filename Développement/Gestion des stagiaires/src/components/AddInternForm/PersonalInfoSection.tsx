import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormData } from "../AddInternForm";
import { Info } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

interface PersonalInfoSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

export const PersonalInfoSection = ({ formData, updateFormData, errors }: PersonalInfoSectionProps) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Nom de famille */}
        <div className="space-y-2">
          <Label htmlFor="lastName" className="text-sm font-medium">
            Nom de famille <span className="text-red-500">*</span>
          </Label>
          <Input
            id="lastName"
            value={formData.lastName}
            onChange={(e) => updateFormData({ lastName: e.target.value })}
            placeholder="Entrez votre nom de famille"
            className={errors.lastName ? "border-red-500" : ""}
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName}</p>
          )}
        </div>

        {/* Prénom */}
        <div className="space-y-2">
          <Label htmlFor="firstName" className="text-sm font-medium">
            Prénom <span className="text-red-500">*</span>
          </Label>
          <Input
            id="firstName"
            value={formData.firstName}
            onChange={(e) => updateFormData({ firstName: e.target.value })}
            placeholder="Entrez votre prénom"
            className={errors.firstName ? "border-red-500" : ""}
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Numéro CNI */}
        <div className="space-y-2">
          <Label htmlFor="nationalId" className="text-sm font-medium">
            Numéro CNI <span className="text-red-500">*</span>
          </Label>
          <Input
            id="nationalId"
            value={formData.nationalId}
            onChange={(e) => updateFormData({ nationalId: e.target.value })}
            placeholder="Entrez votre numéro de carte d'identité"
            className={errors.nationalId ? "border-red-500" : ""}
          />
          {errors.nationalId && (
            <p className="text-red-500 text-sm">{errors.nationalId}</p>
          )}
        </div>

        {/* Email */}
        <div className="space-y-2">
          <Label htmlFor="email" className="text-sm font-medium">
            Adresse email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => updateFormData({ email: e.target.value })}
            placeholder="Entrez votre adresse email"
            className={errors.email ? "border-red-500" : ""}
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Niveau d'éducation */}
        <div className="space-y-2">
          <Label htmlFor="educationLevel" className="text-sm font-medium">
            Niveau d'éducation <span className="text-red-500">*</span>
          </Label>
          <Select 
            value={formData.educationLevel} 
            onValueChange={(value) => updateFormData({ educationLevel: value })}
          >
            <SelectTrigger className={errors.educationLevel ? "border-red-500" : ""}>
              <SelectValue placeholder="Sélectionnez un niveau d'éducation" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="bachelor">Licence</SelectItem>
              <SelectItem value="master">Master</SelectItem>
              <SelectItem value="phd">Doctorat</SelectItem>
              <SelectItem value="diploma">Diplôme</SelectItem>
              <SelectItem value="certificate">Certificat</SelectItem>
            </SelectContent>
          </Select>
          {errors.educationLevel && (
            <p className="text-red-500 text-sm">{errors.educationLevel}</p>
          )}
        </div>

        {/* Spécialisation */}
        <div className="space-y-2">
          <Label htmlFor="specialization" className="text-sm font-medium">
            Spécialisation <span className="text-red-500">*</span>
          </Label>
          <Input
            id="specialization"
            value={formData.specialization}
            onChange={(e) => updateFormData({ specialization: e.target.value })}
            placeholder="Entrez votre spécialisation"
            className={errors.specialization ? "border-red-500" : ""}
          />
          {errors.specialization && (
            <p className="text-red-500 text-sm">{errors.specialization}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* École/Université */}
        <div className="space-y-2">
          <Label htmlFor="school" className="text-sm font-medium">
            École/Université 
          </Label>
          <Input
            id="school"
            value={formData.school}
            onChange={(e) => updateFormData({ school: e.target.value })}
            placeholder="Entrez le nom de votre école/université"
            className={errors.school ? "border-red-500" : ""}
          />
          {errors.school && (
            <p className="text-red-500 text-sm">{errors.school}</p>
          )}
        </div>

        {/* Superviseur académique */}
        <div className="space-y-2">
          <Label htmlFor="schoolSupervisor" className="text-sm font-medium">
            Superviseur académique
          </Label>
          <Input
            id="schoolSupervisor"
            value={formData.schoolSupervisor}
            onChange={(e) => updateFormData({ schoolSupervisor: e.target.value })}
            placeholder="Entrez le nom du superviseur"
          />
        </div>
      </div>

      {/* Statut de confirmation */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <div className="flex items-center space-x-3">
            <Checkbox
              id="isConfirmed"
              checked={formData.isConfirmed}
              onCheckedChange={(checked) => updateFormData({ isConfirmed: checked as boolean })}
            />
            <div className="flex items-center space-x-2">
              <Label htmlFor="isConfirmed" className="text-sm font-medium cursor-pointer">
                Statut du stagiaire confirmé
              </Label>
              <Info className="w-4 h-4 text-blue-500" />
            </div>
          </div>
          <p className="text-sm text-muted-foreground mt-2 ml-6">
            Cochez cette case pour confirmer que le stagiaire a été vérifié et approuvé pour le programme.
          </p>
        </CardContent>
      </Card>
    </div>
  );
};