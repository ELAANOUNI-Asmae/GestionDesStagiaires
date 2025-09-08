// src/components/Dashboard.tsx
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FolderOpen, AlertTriangle, Calendar, TrendingUp, Clock } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

// Importez vos données mockées depuis les sections correspondantes
// Assurez-vous que ces chemins sont corrects et que ces variables sont exportées dans les fichiers source
import { mockInterns } from "./InternsSection";
import { existingProjects } from "./DeliverablesSection";
import { constants } from "crypto";

interface DashboardProps {
  onNavigate: (section: string) => void;
}

export const Dashboard = ({ onNavigate }: DashboardProps) => {
  // Calcul dynamique des statistiques (tel que fait précédemment)
  const totalInterns = mockInterns.length;

  const ongoingProjects = new Set(
    mockInterns
      .filter(project => project.name !== null)
      .map(project => project.name)
  ).size;

  const unjustifiedAbsences = mockInterns.reduce((sum, intern) => sum + intern.absences, 0);

  const deliverablesDue = existingProjects.reduce((count, project) => {
    return (
      count +
      project.deliverables.filter(
        (deliverable) => !deliverable.isCompleted
      ).length
    );
  }, 0);


  const stats = [
    {
      title: "Stagiaires Totaux",
      value: totalInterns.toString(),
      change: "+12 ce mois-ci",
      icon: Users,
      color: "text-blue-600",
      bgColor: "bg-blue-100",
      section: "Interns",
      ariaLabel: "Voir tous les stagiaires"
    },
    {
      title: "Projets en Cours",
      value: ongoingProjects.toString(),
      change: "+5 cette semaine",
      icon: FolderOpen,
      color: "text-green-600",
      bgColor: "bg-green-100",
      section: "Projects",
      ariaLabel: "Voir tous les projets"
    },
    {
      title: "Absences Non Justifiées",
      value: unjustifiedAbsences.toString(),
      change: "Nécessite vérification",
      icon: AlertTriangle,
      color: "text-red-600",
      bgColor: "bg-red-100",
      section: "Absences",
      ariaLabel: "Voir les absences non justifiées"
    },
    {
      title: "Livrables à Terminer",
      value: deliverablesDue.toString(),
      change: "Cette semaine",
      icon: Calendar,
      color: "text-orange-600",
      bgColor: "bg-orange-100",
      section: "Deliverables",
      ariaLabel: "Voir les livrables à venir"
    }
  ];

  const handleCardClick = (section: string, value: string) => {
    onNavigate(section);
  };

  const getAlertVariant = (type: string) => {
    if (type === "error") {
      return "destructive";
    }
    return "default";
  };

  const alerts = [
    {
      type: "warning",
      title: "Livrables en Retard",
      message: "15 livrables sont en retard et nécessitent une attention immédiate."
    },
    {
      type: "error",
      title: "Seuil d'Absence Dépassé",
      message: "3 stagiaires ont dépassé leur seuil d'absence ce mois-ci."
    },
    {
      type: "info",
      title: "Profils Incomplets",
      message: "8 profils de stagiaires manquent d'informations requises."
    }
  ];

  // --- Logique pour l'Activité Récente Dynamique ---
  const getRecentActivities = () => {
    const activities = [];
    const now = new Date(); // Pour simuler des temps "récents"

    // 1. Notifications pour les projets livrés à 100%
    existingProjects.forEach(project => {
      const totalDeliverables = project.deliverables.length;
      const completedDeliverables = project.deliverables.filter(d => d.isCompleted).length;
      const completionRate = totalDeliverables > 0 ? (completedDeliverables / totalDeliverables) * 100 : 0;

      // Si le projet est complet à 100%
      if (completionRate === 100) {
        activities.push({
          action: "Projet Livré",
          name: project.name,
          time: `Livré le ${now.toLocaleDateString('fr-FR')}`,
          type: "project-completed"
        });
      }
    });

    // 2. Simuler l'ajout d'un nouveau stagiaire
    if (mockInterns.length > 0) {
      const lastIntern = mockInterns[mockInterns.length - 1];
      activities.push({
        action: "Nouveau Stagiaire Ajouté",
        name: lastIntern.name,
        time: "Il y a quelques instants",
        type: "new-intern"
      });
    }

    // 3. Simuler la création d'un nouveau projet
    if (existingProjects.length > 0) {
      const lastProject = existingProjects[existingProjects.length - 1];
      activities.push({
        action: "Nouveau Projet Créé",
        name: lastProject.name,
        time: "Récemment",
        type: "new-project"
      });
    }

    // 4. Simuler une absence justifiée
    activities.push({
      action: "Absence Justifiée",
      name: "Un stagiaire",
      time: "Aujourd'hui",
      type: "absence-justified"
    });
    
    return activities;
  };

  const recentActivities = getRecentActivities();

  return (
    <div className="space-y-6">
      {/* Message de bienvenue */}
      <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
        <CardContent className="p-6">
          <h1 className="text-2xl font-bold mb-2">Bonjour, ELAANOUNI Asmae</h1>
          <p className="text-blue-100">Bienvenue sur votre tableau de bord de gestion des stages</p>
        </CardContent>
      </Card>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          const hasNoItems = stat.value === "0";

          return (
            <Card
              key={index}
              className={`cursor-pointer transition-all duration-200 hover:shadow-lg hover:shadow-primary/20 hover:border-primary hover:border-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-lg active:scale-95 ${
                hasNoItems ? 'opacity-70' : ''
              }`}
              onClick={() => handleCardClick(stat.section, stat.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleCardClick(stat.section, stat.value);
                }
              }}
              tabIndex={0}
              role="button"
              aria-label={stat.ariaLabel}
              title={hasNoItems ? "Aucun élément à afficher" : `Cliquez pour voir ${stat.title.toLowerCase()}`}
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
                    <p className="text-sm text-gray-500 mt-1">{stat.change}</p>
                  </div>
                  <div className={`p-3 rounded-full ${stat.bgColor}`}>
                    <Icon className={`w-6 h-6 ${stat.color}`} />
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Alertes */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <AlertTriangle className="w-5 h-5 mr-2 text-red-600" />
              Alertes & Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <Alert key={index} className={`${
                alert.type === 'error' ? 'border-red-200 bg-red-50' :
                alert.type === 'warning' ? 'border-orange-200 bg-orange-50' :
                'border-blue-200 bg-blue-50'
              }`}>
                <AlertDescription>
                  <div className="font-medium">{alert.title}</div>
                  <div className="text-sm text-gray-600 mt-1">{alert.message}</div>
                </AlertDescription>
              </Alert>
            ))}
          </CardContent>
        </Card>

        {/* Activité Récente */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Clock className="w-5 h-5 mr-2 text-blue-600" />
              Activité Récente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.length > 0 ? (
                recentActivities.map((activity, index) => (
                  <div key={index} className="flex items-start space-x-3 pb-3 border-b border-gray-100 last:border-b-0">
                    <div className="w-2 h-2 bg-blue-600 rounded-full mt-2 flex-shrink-0"></div>
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                      <p className="text-sm text-gray-600">{activity.name}</p>
                      <p className="text-xs text-gray-400 mt-1">{activity.time}</p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-sm text-gray-500">Aucune activité récente.</p>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Aperçu des Performances */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
            Aperçu des Performances
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Taux d'Achèvement des Projets</p>
              <Progress value={78} className="mb-2" />
              <p className="text-sm text-gray-500">78% des projets terminés à temps</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Satisfaction des Stagiaires</p>
              <Progress value={92} className="mb-2" />
              <p className="text-sm text-gray-500">92% de taux de satisfaction</p>
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Qualité des Livrables</p>
              <Progress value={85} className="mb-2" />
              <p className="text-sm text-gray-500">85% des livrables répondent aux normes</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};