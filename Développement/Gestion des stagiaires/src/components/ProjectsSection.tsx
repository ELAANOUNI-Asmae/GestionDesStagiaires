import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Plus } from "lucide-react";
import { mockInterns } from "./InternsSection";
import { mockSupervisors } from "./Supervisors";

// Fonction pour vérifier si un stage est actif dans un mois et une année donnés.
// eslint-disable-next-line react-refresh/only-export-components
export const isInternActiveInMonthAndYear = (intern, month, year) => {
  const internStartDate = new Date(intern.startDate);
  const internEndDate = new Date(intern.endDate);
  
  const filterMonthStart = new Date(year, month - 1, 1);
  const filterMonthEnd = new Date(year, month, 0);

  return (
    internStartDate <= filterMonthEnd && internEndDate >= filterMonthStart
  );
};

// Fonction pour extraire les années uniques des données de stagiaires.
// eslint-disable-next-line react-refresh/only-export-components
export const getUniqueYears = () => {
    const years = new Set<number>();
    mockInterns.forEach(intern => {
        years.add(new Date(intern.startDate).getFullYear());
        years.add(new Date(intern.endDate).getFullYear());
    });
    return Array.from(years).sort();
};

// Crée une liste de mois de 1 à 12 pour le sélecteur.
// eslint-disable-next-line react-refresh/only-export-components
export const months = Array.from({ length: 12 }, (_, i) => i + 1);

// Fonction pour extraire les groupes uniques des données de stagiaires.
// eslint-disable-next-line react-refresh/only-export-components
export const getUniqueGroups = () => {
  const groups = new Set<string>();
  mockInterns.forEach(intern => {
    groups.add(intern.group);
  });
  return Array.from(groups).sort();
};

// Fonction pour extraire les départements uniques des données de stagiaires.
// eslint-disable-next-line react-refresh/only-export-components
export const getUniqueDepartments = () => {
  const departments = new Set<string>();
  mockInterns.forEach(intern => {
    departments.add(intern.department);
  });
  return Array.from(departments).sort();
};

// Calcule les statistiques des projets en fonction du mois, de l'année et du département sélectionnés.
// eslint-disable-next-line react-refresh/only-export-components
export const calculateProjectStats = (month, year) => {
  const filteredInterns = mockInterns.filter(intern => isInternActiveInMonthAndYear(intern, month, year));
  
  const projects = new Map();

  filteredInterns.forEach(intern => {
    const { id, project, group, companySupervisor, deliverables, department } = intern;
    if (!projects.has(project)) {
      projects.set(project, {
        id: id,
        name: project,
        supervisors: new Set(),
        groups: new Set(),
        departments: new Set(),
        delivered: 0,
        required: 10,
      });
    }

    const projectData = projects.get(project);
    projectData.supervisors.add(companySupervisor);
    projectData.groups.add(group);
    projectData.departments.add(department);
    projectData.delivered += deliverables;
  });

  return Array.from(projects.values()).map(project => ({
    ...project,
    supervisors: Array.from(project.supervisors).join(", "),
    groups: Array.from(project.groups).join(", "),
    departments: Array.from(project.departments).join(", "),
    remaining: project.required - project.delivered,
    progress: (project.delivered / project.required) * 100,
  }));
};

const NewProjectForm = ({ onSubmit, onCancel, existingGroups, existingSupervisors, existingDepartments }) => {
  const [name, setName] = useState("");
  const [supervisor, setSupervisor] = useState("");
  const [department, setDepartment] = useState("");
  const [group, setGroup] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [requiredDeliverables, setRequiredDeliverables] = useState(1);
  const [deliverables, setDeliverables] = useState([{ name: '', deadline: '' }]);

  const filteredSupervisors = useMemo(() => {
    if (!department) return [];
    return existingSupervisors.filter(sup => sup.department === department);
  }, [department, existingSupervisors]);

  const handleDeliverableChange = (index, field, value) => {
    const newDeliverables = [...deliverables];
    newDeliverables[index][field] = value;
    setDeliverables(newDeliverables);
  };
  
  const handleAddDeliverable = () => {
    setDeliverables([...deliverables, { name: '', deadline: '' }]);
  };
  
  const handleRemoveDeliverable = (index) => {
    const newDeliverables = [...deliverables];
    newDeliverables.splice(index, 1);
    setDeliverables(newDeliverables);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name || !supervisor || !department || !startDate || !endDate) {
      alert("Veuillez remplir tous les champs obligatoires.");
      return;
    }
    
    const allDeliverablesValid = deliverables.every(d => d.name && d.deadline);
    if (!allDeliverablesValid) {
        alert("Veuillez remplir tous les champs de livrables.");
        return;
    }
    
    const projectStartDate = new Date(startDate);
    const projectEndDate = new Date(endDate);
    
    for (const deliverable of deliverables) {
        const deliverableDeadline = new Date(deliverable.deadline);
        if (deliverableDeadline < projectStartDate || deliverableDeadline > projectEndDate) {
            alert(`La date limite du livrable "${deliverable.name}" doit être comprise entre la date de début et la date de fin du projet.`);
            return;
        }
    }

    onSubmit({ 
      name, 
      supervisor, 
      department, 
      group, 
      startDate, 
      endDate, 
      requiredDeliverables: deliverables.length,
      deliverables,
    });
  };

  return (
    <Card className="my-6 p-4">
      <CardHeader>
        <CardTitle>Créer un nouveau projet</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="projectName">Nom du projet *</Label>
            <Input id="projectName" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectDepartment">Département *</Label>
            <select
                id="projectDepartment"
                value={department}
                onChange={(e) => setDepartment(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
            >
                <option value="">Sélectionner un département</option>
                {existingDepartments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectSupervisor">Encadrant *</Label>
            <select
                id="projectSupervisor"
                value={supervisor}
                onChange={(e) => setSupervisor(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                required
            >
                <option value="">Sélectionner un encadrant</option>
                {filteredSupervisors.map(sup => (
                    <option key={sup.id} value={`${sup.firstName} ${sup.lastName}`}>
                        {sup.firstName} {sup.lastName}
                    </option>
                ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="projectGroup">Groupe concerné</Label>
            <select
                id="projectGroup"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
            >
                <option value="">Sélectionner un groupe ou ajouter</option>
                {existingGroups.map((g) => (
                    <option key={g} value={g}>{g}</option>
                ))}
            </select>
            <Input
                type="text"
                placeholder="Entrez un nouveau groupe si nécessaire"
                value={group}
                onChange={(e) => setGroup(e.target.value)}
                className="mt-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="startDate">Date de début *</Label>
              <Input id="startDate" type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="endDate">Date de fin *</Label>
              <Input id="endDate" type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} required />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="font-semibold">Livrables *</Label>
            {deliverables.map((deliverable, index) => (
              <div key={index} className="flex items-end gap-2">
                <div className="flex-1 space-y-1">
                  <Label htmlFor={`deliverable-name-${index}`} className="sr-only">Nom du livrable</Label>
                  <Input 
                    id={`deliverable-name-${index}`} 
                    type="text" 
                    placeholder="Nom du livrable" 
                    value={deliverable.name} 
                    onChange={(e) => handleDeliverableChange(index, 'name', e.target.value)} 
                    required 
                  />
                </div>
                <div className="flex-1 space-y-1">
                  <Label htmlFor={`deliverable-deadline-${index}`} className="sr-only">Date limite</Label>
                  <Input 
                    id={`deliverable-deadline-${index}`} 
                    type="date" 
                    value={deliverable.deadline} 
                    onChange={(e) => handleDeliverableChange(index, 'deadline', e.target.value)} 
                    required 
                  />
                </div>
                {deliverables.length > 1 && (
                    <Button type="button" variant="ghost" onClick={() => handleRemoveDeliverable(index)} className="px-2">
                      -
                    </Button>
                )}
              </div>
            ))}
            <Button type="button" variant="outline" onClick={handleAddDeliverable} className="w-full">
              Ajouter un livrable
            </Button>
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={onCancel}>
              Annuler
            </Button>
            <Button type="submit">Créer</Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export const ProjectsSection = () => {
  const uniqueYears = useMemo(() => getUniqueYears(), []);
  const uniqueGroups = useMemo(() => getUniqueGroups(), []);
  const uniqueDepartments = useMemo(() => getUniqueDepartments(), []);
  
  const [selectedYear, setSelectedYear] = useState<number>(uniqueYears.length > 0 ? uniqueYears[0] : new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState<number>(new Date().getMonth() + 1);
  const [selectedDepartment, setSelectedDepartment] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  
  const [newProjects, setNewProjects] = useState([]);
  const [isFormVisible, setIsFormVisible] = useState(false);

  const handleFormSubmit = ({ name, supervisor, department, group, startDate, endDate, requiredDeliverables, deliverables }) => {
    const maxIdFromMock = mockInterns.length > 0 ? Math.max(...mockInterns.map(i => i.id)) : 0;
    const maxIdFromNew = newProjects.length > 0 ? Math.max(...newProjects.map(p => p.id)) : 0;
    const newId = Math.max(maxIdFromMock, maxIdFromNew) + 1;

    const newProject = {
      id: newId,
      name,
      supervisors: supervisor,
      groups: group,
      departments: department,
      delivered: 0,
      required: requiredDeliverables,
      remaining: requiredDeliverables,
      progress: 0,
      startDate,
      endDate,
      deliverables,
    };
    setNewProjects(prevProjects => [...prevProjects, newProject]);
    setIsFormVisible(false);
  };
  
  const projectStats = useMemo(() => {
    const stats = calculateProjectStats(selectedMonth, selectedYear);
    const allProjects = [...stats, ...newProjects];
    
    let filteredProjects = allProjects;
    if (filterStatus === "completed") {
        filteredProjects = filteredProjects.filter(project => project.progress >= 100);
    }
    if (filterStatus === "in-progress") {
        filteredProjects = filteredProjects.filter(project => project.progress < 100);
    }
    
    if (selectedDepartment !== "all") {
        filteredProjects = filteredProjects.filter(project => project.departments.includes(selectedDepartment));
    }

    return filteredProjects;
  }, [selectedMonth, selectedYear, selectedDepartment, filterStatus, newProjects]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Projets</h2>
      
      <div className="flex items-center justify-between space-x-4">
        <div className="flex items-center flex-wrap gap-4">
            <div className="flex items-center space-x-2">
                <label htmlFor="year-select" className="font-semibold text-gray-700">Filtrer par année :</label>
                <select
                  id="year-select"
                  value={selectedYear}
                  onChange={(e) => setSelectedYear(Number(e.target.value))}
                  className="border rounded-md px-3 py-2 text-sm max-w-xs"
                >
                  {uniqueYears.map(year => (
                    <option key={year} value={year}>
                      {year}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="month-select" className="font-semibold text-gray-700">Filtrer par mois :</label>
                <select
                  id="month-select"
                  value={selectedMonth}
                  onChange={(e) => setSelectedMonth(Number(e.target.value))}
                  className="border rounded-md px-3 py-2 text-sm max-w-xs"
                >
                  {months.map(month => (
                    <option key={month} value={month}>
                      {new Date(selectedYear, month - 1, 1).toLocaleString('fr-FR', { month: 'long' })}
                    </option>
                  ))}
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="status-select" className="font-semibold text-gray-700">Statut :</label>
                <select
                  id="status-select"
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm max-w-xs"
                >
                  <option value="all">Tous les projets</option>
                  <option value="completed">Terminés</option>
                  <option value="in-progress">En cours</option>
                </select>
            </div>
            <div className="flex items-center space-x-2">
                <label htmlFor="department-select" className="font-semibold text-gray-700">Département :</label>
                <select
                  id="department-select"
                  value={selectedDepartment}
                  onChange={(e) => setSelectedDepartment(e.target.value)}
                  className="border rounded-md px-3 py-2 text-sm max-w-xs"
                >
                  <option value="all">Tous les départements</option>
                  {uniqueDepartments.map(dep => (
                    <option key={dep} value={dep}>{dep}</option>
                  ))}
                </select>
            </div>
        </div>
        <Button onClick={() => setIsFormVisible(true)} className="flex items-center gap-2">
            <Plus className="w-4 h-4" />
            Créer un projet
        </Button>
      </div>
      
      {isFormVisible && (
        <NewProjectForm 
          onSubmit={handleFormSubmit}
          onCancel={() => setIsFormVisible(false)}
          existingGroups={uniqueGroups}
          existingSupervisors={mockSupervisors}
          existingDepartments={uniqueDepartments}
        />
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {projectStats.length > 0 ? (
          projectStats.map((project, index) => (
            <Card key={index} className={project.progress >= 100 ? "border-2 border-green-500" : ""}>
              <CardHeader>
                <CardTitle>{project.name}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3 text-sm text-gray-700">
                <p><span className="font-semibold">ID du projet :</span> {project.id}</p>
                <p><span className="font-semibold">Encadrant(s) :</span> {project.supervisors}</p>
                <p><span className="font-semibold">Département(s) :</span> {project.departments}</p>
                <p><span className="font-semibold">Groupe(s) concerné(s) :</span> {project.groups}</p>
                <div className="pb-2 border-b">
                  <Progress value={project.progress} />
                  <div className="flex justify-end text-xs text-gray-500 mt-1">
                    {project.delivered}/{project.required}
                  </div>
                </div>
                <div className="flex justify-end items-center pt-2">
                  <Badge variant={project.remaining === 0 ? "default" : "secondary"} className={project.remaining === 0 ? "bg-green-500 hover:bg-green-600" : ""}>
                    Restant : {project.remaining}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent>
              <p className="text-gray-600">Aucun projet trouvé pour cette période.</p>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};