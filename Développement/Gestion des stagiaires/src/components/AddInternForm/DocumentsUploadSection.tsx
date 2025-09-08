import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Upload, File, X, Eye, CheckCircle, AlertCircle } from "lucide-react";
import { FormData } from "../AddInternForm";
import { useToast } from "@/hooks/use-toast";

interface DocumentsUploadSectionProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

const requiredDocuments = [
  { key: "cv", label: "CV", description: "Votre curriculum vitae" },
  { key: "coverLetter", label: "Lettre de motivation", description: "Lettre de motivation" },
  { key: "internshipRequest", label: "Demande de stage", description: "Demande formelle de stage" },
  { key: "internshipAgreement", label: "Convention de stage", description: "Convention de stage signée" },
  { key: "nationalIdCopy", label: "Copie de la carte d'identité", description: "Copie de la carte d'identité nationale" },
];

const acceptedFormats = ["PDF", "DOC", "DOCX", "JPG", "JPEG", "PNG"];
const maxFileSize = 5 * 1024 * 1024; // 5MB

export const DocumentsUploadSection = ({ formData, updateFormData, errors }: DocumentsUploadSectionProps) => {
  const [uploadProgress, setUploadProgress] = useState<Record<string, number>>({});
  const { toast } = useToast();

  const validateFile = (file: File): string | null => {
    if (file.size > maxFileSize) {
      return "La taille du fichier doit être inférieure à 5MB";
    }

    const extension = file.name.split('.').pop()?.toUpperCase();
    if (!extension || !acceptedFormats.includes(extension)) {
      return `Format de fichier non supporté. Veuillez utiliser : ${acceptedFormats.join(', ')}`;
    }

    return null;
  };

  const simulateUpload = (key: string): Promise<void> => {
    return new Promise((resolve) => {
      let progress = 0;
      const interval = setInterval(() => {
        progress += Math.random() * 30;
        if (progress >= 100) {
          progress = 100;
          clearInterval(interval);
          setUploadProgress(prev => ({ ...prev, [key]: 0 }));
          resolve();
        }
        setUploadProgress(prev => ({ ...prev, [key]: progress }));
      }, 100);
    });
  };

  const handleFileUpload = async (key: string, file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      toast({
        title: "Erreur de téléchargement",
        description: validationError,
        variant: "destructive",
      });
      return;
    }

    try {
      await simulateUpload(key);
      updateFormData({
        documents: {
          ...formData.documents,
          [key]: file,
        },
      });
      toast({
        title: "Téléchargement réussi",
        description: `${file.name} a été téléchargé avec succès.`,
      });
    } catch (error) {
      toast({
        title: "Échec du téléchargement",
        description: "Échec du téléchargement du fichier. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  const handleFileRemove = (key: string) => {
    updateFormData({
      documents: {
        ...formData.documents,
        [key]: null,
      },
    });
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <div className="space-y-6">
      {/* Instructions de téléchargement */}
      <Card className="border-l-4 border-l-blue-500">
        <CardContent className="p-4">
          <h3 className="font-medium mb-2">Exigences de téléchargement</h3>
          <ul className="text-sm text-muted-foreground space-y-1">
            <li>• Taille maximale : 5MB par fichier</li>
            <li>• Formats acceptés : {acceptedFormats.join(', ')}</li>
            <li>• Tous les documents marqués d'un * sont obligatoires</li>
            <li>• Les fichiers doivent être clairs et lisibles</li>
          </ul>
        </CardContent>
      </Card>

      {/* Cartes de téléchargement de documents */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {requiredDocuments.map((doc) => {
          const file = formData.documents[doc.key as keyof typeof formData.documents];
          const progress = uploadProgress[doc.key];
          const hasError = errors[doc.key];

          return (
            <Card key={doc.key} className={`${hasError ? 'border-red-500' : ''}`}>
              <CardContent className="p-4">
                <div className="space-y-3">
                  <div>
                    <Label className="text-sm font-medium">
                      {doc.label} <span className="text-red-500">*</span>
                    </Label>
                    <p className="text-xs text-muted-foreground">{doc.description}</p>
                  </div>

                  {!file && progress === undefined && (
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center">
                      <input
                        type="file"
                        id={`file-${doc.key}`}
                        className="hidden"
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={(e) => {
                          const selectedFile = e.target.files?.[0];
                          if (selectedFile) {
                            handleFileUpload(doc.key, selectedFile);
                          }
                        }}
                      />
                      <label
                        htmlFor={`file-${doc.key}`}
                        className="cursor-pointer flex flex-col items-center space-y-2"
                      >
                        <Upload className="w-8 h-8 text-gray-400" />
                        <span className="text-sm text-gray-600">Cliquez pour télécharger</span>
                        <span className="text-xs text-gray-400">ou glisser-déposer</span>
                      </label>
                    </div>
                  )}

                  {progress !== undefined && progress > 0 && (
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Upload className="w-4 h-4 text-blue-500" />
                        <span className="text-sm">Téléchargement en cours...</span>
                      </div>
                      <Progress value={progress} className="h-2" />
                    </div>
                  )}

                  {file && (
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                        <div>
                          <p className="text-sm font-medium">{file.name}</p>
                          <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                        </div>
                      </div>
                      <div className="flex space-x-1">
                        <Button size="sm" variant="ghost" onClick={() => {/* Fonctionnalité de prévisualisation */}}>
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button size="sm" variant="ghost" onClick={() => handleFileRemove(doc.key)}>
                          <X className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  )}

                  {hasError && (
                    <div className="flex items-center space-x-2 text-red-500">
                      <AlertCircle className="w-4 h-4" />
                      <span className="text-sm">{errors[doc.key]}</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>
    </div>
  );
};