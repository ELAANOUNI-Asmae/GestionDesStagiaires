import { useState, useEffect } from "react";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Info, Plus } from "lucide-react";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { FormData, InternType } from "../AddInternForm";
import { useToast } from "@/hooks/use-toast";

interface Group {
  id: string;
  name: string;
  internCount: number;
  internshipTypes: InternType[];
}

interface Project {
  id: string;
  name: string;
  managementMethod: string;
  internshipTypes: InternType[];
  groupId?: string;
}

interface GroupProjectSelectorProps {
  formData: FormData;
  updateFormData: (updates: Partial<FormData>) => void;
  errors: Record<string, string>;
}

// Données fictives pour les groupes et projets
const mockGroups: Group[] = [
  { id: "1", name: "Équipe de développement Alpha", internCount: 3, internshipTypes: ["PFE", "PFA"] },
  { id: "2", name: "Équipe design Beta", internCount: 2, internshipTypes: ["Initiation", "Application"] },
  { id: "3", name: "Équipe marketing Gamma", internCount: 1, internshipTypes: ["Observation", "Application"] },
];

const mockProjects: Project[] = [
  { id: "1", name: "Refonte d'application web", managementMethod: "Scrum Agile", internshipTypes: ["PFE", "PFA"], groupId: "1" },
  { id: "2", name: "Développement d'application mobile", managementMethod: "Kanban", internshipTypes: ["PFE"], groupId: "1" },
  { id: "3", name: "Étude recherche UI/UX", managementMethod: "Design Thinking", internshipTypes: ["Initiation", "Application"], groupId: "2" },
  { id: "4", name: "Projet identité de marque", managementMethod: "Waterfall", internshipTypes: ["Application"], groupId: "2" },
  { id: "5", name: "Analyse de marché", managementMethod: "Lean", internshipTypes: ["Observation", "Application"], groupId: "3" },
];

export const GroupProjectSelector = ({ formData, updateFormData, errors }: GroupProjectSelectorProps) => {
  const [groups, setGroups] = useState<Group[]>(mockGroups);
  const [projects, setProjects] = useState<Project[]>(mockProjects);
  const [showGroupDialog, setShowGroupDialog] = useState(false);
  const [showProjectDialog, setShowProjectDialog] = useState(false);
  const [newGroupName, setNewGroupName] = useState("");
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectMethod, setNewProjectMethod] = useState("");
  const [groupTypeAlert, setGroupTypeAlert] = useState("");
  const { toast } = useToast();

  // Filtrer les projets en fonction du type de stage et du groupe sélectionné
  const getFilteredProjects = () => {
    let filtered = projects;

    if (formData.internshipType) {
      filtered = filtered.filter(project => 
        project.internshipTypes.includes(formData.internshipType as InternType)
      );
    }

    if (formData.selectedGroupId) {
      filtered = filtered.filter(project => project.groupId === formData.selectedGroupId);
    }

    return filtered;
  };

  // Vérifier la compatibilité du groupe lorsqu'il est sélectionné
  useEffect(() => {
    if (formData.selectedGroupId && formData.internshipType) {
      const selectedGroup = groups.find(g => g.id === formData.selectedGroupId);
      if (selectedGroup && !selectedGroup.internshipTypes.includes(formData.internshipType as InternType)) {
        setGroupTypeAlert(`Ce groupe contient des stagiaires de type ${selectedGroup.internshipTypes.join(', ')} : Votre stage doit correspondre à ce type`);
      } else {
        setGroupTypeAlert("");
      }
    } else {
      setGroupTypeAlert("");
    }
  }, [formData.selectedGroupId, formData.internshipType, groups]);

  const handleCreateGroup = () => {
    if (!newGroupName.trim()) return;

    const newGroup: Group = {
      id: Date.now().toString(),
      name: newGroupName,
      internCount: 0,
      internshipTypes: formData.internshipType ? [formData.internshipType as InternType] : [],
    };

    setGroups(prev => [...prev, newGroup]);
    updateFormData({ selectedGroupId: newGroup.id });
    setNewGroupName("");
    setShowGroupDialog(false);
    
    toast({
      title: "Groupe créé",
      description: `Le nouveau groupe "${newGroupName}" a été créé avec succès.`,
    });
  };

  const handleCreateProject = () => {
    if (!newProjectName.trim() || !newProjectMethod.trim()) return;

    const newProject: Project = {
      id: Date.now().toString(),
      name: newProjectName,
      managementMethod: newProjectMethod,
      internshipTypes: formData.internshipType ? [formData.internshipType as InternType] : [],
      groupId: formData.selectedGroupId,
    };

    setProjects(prev => [...prev, newProject]);
    updateFormData({ selectedProjectId: newProject.id });
    setNewProjectName("");
    setNewProjectMethod("");
    setShowProjectDialog(false);
    
    toast({
      title: "Projet créé",
      description: `Le nouveau projet "${newProjectName}" a été créé avec succès.`,
    });
  };

  return (
    <div className="space-y-6">
      {/* Affectation de groupe */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="group" className="text-sm font-medium">
            Affectation de groupe
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Lier à un groupe existant ou créer un nouveau</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Select 
          value={formData.selectedGroupId || ""} 
          onValueChange={(value) => {
            if (value === "create-new") {
              setShowGroupDialog(true);
            } else {
              updateFormData({ selectedGroupId: value, selectedProjectId: "" });
            }
          }}
        >
          <SelectTrigger className={`w-full ${errors.selectedGroupId ? 'border-destructive' : ''}`}>
            <SelectValue placeholder="Sélectionner un groupe" />
          </SelectTrigger>
          <SelectContent>
            {groups.map((group) => (
              <SelectItem key={group.id} value={group.id}>
                {group.name} ({group.internCount} stagiaires)
              </SelectItem>
            ))}
            <SelectItem value="create-new" className="text-primary">
              <div className="flex items-center space-x-2">
                <Plus className="w-4 h-4" />
                <span>Créer un nouveau groupe</span>
              </div>
            </SelectItem>
          </SelectContent>
        </Select>
        
        {errors.selectedGroupId && (
          <p className="text-sm text-destructive">{errors.selectedGroupId}</p>
        )}
        
        {groupTypeAlert && (
          <p className="text-sm text-orange-600 bg-orange-50 p-2 rounded">{groupTypeAlert}</p>
        )}
      </div>

      {/* Affectation de projet */}
      <div className="space-y-2">
        <div className="flex items-center space-x-2">
          <Label htmlFor="project" className="text-sm font-medium">
            Affectation de projet
          </Label>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Info className="w-4 h-4 text-muted-foreground" />
              </TooltipTrigger>
              <TooltipContent>
                <p>Projets filtrés par type de stage et groupe sélectionné</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Select 
          value={formData.selectedProjectId || ""} 
          onValueChange={(value) => {
            if (value === "create-new") {
              setShowProjectDialog(true);
            } else {
              updateFormData({ selectedProjectId: value });
            }
          }}
          disabled={!formData.internshipType}
        >
          <SelectTrigger className={`w-full ${errors.selectedProjectId ? 'border-destructive' : ''}`}>
            <SelectValue placeholder={formData.internshipType ? "Sélectionner un projet" : "Sélectionnez d'abord un type de stage"} />
          </SelectTrigger>
          <SelectContent>
            {getFilteredProjects().map((project) => (
              <SelectItem key={project.id} value={project.id}>
                <div>
                  <div className="font-medium">{project.name}</div>
                  <div className="text-sm text-muted-foreground">{project.managementMethod}</div>
                </div>
              </SelectItem>
            ))}
            {formData.internshipType && (
              <SelectItem value="create-new" className="text-primary">
                <div className="flex items-center space-x-2">
                  <Plus className="w-4 h-4" />
                  <span>Créer un nouveau projet</span>
                </div>
              </SelectItem>
            )}
          </SelectContent>
        </Select>
        
        {errors.selectedProjectId && (
          <p className="text-sm text-destructive">{errors.selectedProjectId}</p>
        )}
      </div>

      {/* Dialogue de création de groupe */}
      <Dialog open={showGroupDialog} onOpenChange={setShowGroupDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau groupe</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="groupName">Nom du groupe</Label>
              <Input
                id="groupName"
                value={newGroupName}
                onChange={(e) => setNewGroupName(e.target.value)}
                placeholder="Entrez le nom du groupe"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowGroupDialog(false)}>
                Annuler
              </Button>
              <Button onClick={handleCreateGroup} disabled={!newGroupName.trim()}>
                Créer le groupe
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Dialogue de création de projet */}
      <Dialog open={showProjectDialog} onOpenChange={setShowProjectDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Créer un nouveau projet</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label htmlFor="projectName">Nom du projet</Label>
              <Input
                id="projectName"
                value={newProjectName}
                onChange={(e) => setNewProjectName(e.target.value)}
                placeholder="Entrez le nom du projet"
              />
            </div>
            <div>
              <Label htmlFor="projectMethod">Méthode de gestion</Label>
              <Input
                id="projectMethod"
                value={newProjectMethod}
                onChange={(e) => setNewProjectMethod(e.target.value)}
                placeholder="ex. : Scrum Agile, Kanban, Waterfall"
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button variant="outline" onClick={() => setShowProjectDialog(false)}>
                Annuler
              </Button>
              <Button 
                onClick={handleCreateProject} 
                disabled={!newProjectName.trim() || !newProjectMethod.trim()}
              >
                Créer le projet
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};