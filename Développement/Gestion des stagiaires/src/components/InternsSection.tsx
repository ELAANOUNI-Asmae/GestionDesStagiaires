import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { EditInternForm } from "./EditInternForm";
import { Intern } from "./types";
import { Checkbox } from "@/components/ui/checkbox";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";
import {
  Search,
  Filter,
  Download,
  Eye,
  Edit,
  Plus,
  Mail,
  Phone,
  Calendar,
  Building,
  ArrowLeft,
  LayoutGrid,
  List,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import { AddInternForm } from "./AddInternForm";
import { Dialog, DialogContent } from "@/components/ui/dialog";

// eslint-disable-next-line react-refresh/only-export-components
export const mockInterns = [
  {
    id: 1,
    name: "Alice Johnson",
    email: "alice.johnson@email.com",
    phone: "+1 (555) 123-4567",
    internship: "PFA",
    startDate: "2024-01-15",
    endDate: "2024-06-15",
    status: "Confirmé",
    companySupervisor: "John Manager",
    project: "Développement d'Application Mobile",
    absences: 28,
    profilePictureUrl: "https://i.pravatar.cc/150?img=1",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-06-10",
    isAttestationImported: true,
    attestationImportDate: "2024-06-15",
    cin : "JK67923",
  },
  {
    id: 2,
    name: "Bob Chen",
    email: "bob.chen@email.com",
    phone: "+1 (555) 987-6543",
    internship: "Initiation",
    startDate: "2028-02-01",
    endDate: "2028-07-01",
    status: "Confirmé",
    companySupervisor: "Jane Doe",
    project: "Recherche en IA",
    absences: 0,
    profilePictureUrl: "https://i.pravatar.cc/150?img=2",
    isReportSubmitted: false,
    reportSubmissionDate: null,
    isAttestationImported: false,
    attestationImportDate: null,
    cin : "JK67923",
  },
  {
    id: 3,
    name: "Charlie Brown",
    email: "asmaeelaanouni@gmail.com",
    phone: "+1 (555) 111-2222",
    internship: "PFE",
    startDate: "2024-03-10",
    endDate: "2024-09-10",
    status: "Terminé",
    companySupervisor: "Mike Ross",
    project: "Analyse de Big Data",
    absences: 16,
    profilePictureUrl: "https://i.pravatar.cc/150?img=3",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-09-05",
    isAttestationImported: true,
    attestationImportDate: "2024-09-10",
    cin : "JK67923",
  },
  {
    id: 4,
    name: "Diana Prince",
    email: "diana.prince@email.com",
    phone: "+1 (555) 333-4444",
    internship: "PFA",
    startDate: "2024-04-01",
    endDate: "2024-10-01",
    status: "Non confirmé",
    companySupervisor: "Sarah Connor",
    project: "Infrastructure Cloud",
    absences: 10,
    profilePictureUrl: "https://i.pravatar.cc/150?img=4",
    isReportSubmitted: false,
    reportSubmissionDate: null,
    isAttestationImported: false,
    attestationImportDate: null,
    cin : "JK67923",
  },
  {
    id: 5,
    name: "Eve Adams",
    email: "eve.adams@email.com",
    phone: "+1 (555) 555-6666",
    internship: "PFA",
    startDate: "2024-01-20",
    endDate: "2024-07-20",
    status: "Confirmé",
    companySupervisor: "Chris Evans",
    project: "Analyse Prédictive",
    absences: 3,
    profilePictureUrl: "https://i.pravatar.cc/150?img=5",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-07-15",
    isAttestationImported: false,
    attestationImportDate: null,
    cin : "JK67923",
  },
  {
    id: 6,
    name: "Frank White",
    email: "frank.white@email.com",
    phone: "+1 (555) 777-8888",
    internship: "PFA",
    startDate: "2024-02-15",
    endDate: "2024-08-15",
    status: "Confirmé",
    companySupervisor: "Laura Croft",
    project: "Sécurité Réseau",
    absences: 0,
    profilePictureUrl: "https://i.pravatar.cc/150?img=6",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-08-10",
    isAttestationImported: true,
    attestationImportDate: "2024-08-15",
    cin : "JK67923",
  },
  {
    id: 7,
    name: "Grace Hall",
    email: "grace.hall@email.com",
    phone: "+1 (555) 999-0000",
    internship: "PFA",
    startDate: "2024-03-01",
    endDate: "2024-09-01",
    status: "Non confirmé",
    companySupervisor: "David Lee",
    project: "Séquençage Génétique",
    absences: 9,
    profilePictureUrl: "https://i.pravatar.cc/150?img=7",
    isReportSubmitted: false,
    reportSubmissionDate: null,
    isAttestationImported: false,
    attestationImportDate: null,
    cin : "JK67923",
  },
  {
    id: 8,
    name: "Harry King",
    email: "harry.king@email.com",
    phone: "+1 (555) 222-3333",
    internship: "PFA",
    startDate: "2024-04-20",
    endDate: "2024-10-20",
    status: "Terminé",
    companySupervisor: "Jessica Alba",
    project: "Développement de Moteur de Jeu",
    absences: 11,
    profilePictureUrl: "https://i.pravatar.cc/150?img=8",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-10-15",
    isAttestationImported: true,
    attestationImportDate: "2024-10-20",
    cin : "JK67923",
  },
  {
    id: 9,
    name: "Ivy Lynn",
    email: "ivy.lynn@email.com",
    phone: "+1 (555) 444-5555",
    internship: "PFA",
    startDate: "2024-01-01",
    endDate: "2024-06-01",
    status: "Confirmé",
    companySupervisor: "Robert Downey",
    project: "Trading Algorithmique",
    absences: 30,
    profilePictureUrl: "https://i.pravatar.cc/150?img=9",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-05-28",
    isAttestationImported: false,
    attestationImportDate: null,
    cin : "JK67923",
  },
  {
    id: 10,
    name: "Jack Hill",
    email: "jack.hill@email.com",
    phone: "+1 (555) 666-7777",
    internship: "PFA",
    startDate: "2024-02-01",
    endDate: "2024-08-01",
    status: "Confirmé",
    companySupervisor: "Emily Blunt",
    project: "Système de Gestion des Patients",
    absences: 0,
    profilePictureUrl: "https://i.pravatar.cc/150?img=10",
    isReportSubmitted: true,
    reportSubmissionDate: "2024-07-28",
    isAttestationImported: true,
    attestationImportDate: "2024-08-01",
    cin : "JK67923",
  },
];

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    textAlign: "center",
    marginBottom: 20,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 10,
    fontWeight: "bold",
  },
  text: {
    fontSize: 12,
    marginBottom: 5,
  },
});

const InternProfileDocument = ({ intern }) => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text style={styles.title}>Profil de {intern.name}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Informations Personnelles</Text>
        <Text style={styles.text}>Email: {intern.email}</Text>
        <Text style={styles.text}>Téléphone: {intern.phone}</Text>
        <Text style={styles.text}>CIN: {intern.cin}</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Détails du Stage</Text>
        <Text style={styles.text}>Type de stage: {intern.internship}</Text>
        <Text style={styles.text}>
          Durée: {intern.startDate} à {intern.endDate}
        </Text>
        <Text style={styles.text}>Statut: {intern.status}</Text>
        <Text style={styles.text}>Absences: {intern.absences}</Text>
        <Text style={styles.text}>
          Rapport rendu: {intern.isReportSubmitted ? "Oui" : "Non"}
        </Text>
        {intern.reportSubmissionDate && (
          <Text style={styles.text}>
            Date de remise: {intern.reportSubmissionDate}
          </Text>
        )}
        <Text style={styles.text}>
          Attestation importée: {intern.isAttestationImported ? "Oui" : "Non"}
        </Text>
        {intern.attestationImportDate && (
          <Text style={styles.text}>
            Date d'importation: {intern.attestationImportDate}
          </Text>
        )}
      </View>
      <View style={styles.section}>
        <Text style={styles.subtitle}>Superviseurs et Projet</Text>
        <Text style={styles.text}>
          Superviseur entreprise: {intern.companySupervisor}
        </Text>
        <Text style={styles.text}>Projet: {intern.project}</Text>
      </View>
    </Page>
  </Document>
);

const getStatusColor = (status: string) => {
  switch (status) {
    case "Confirmé":
      return "bg-green-100 text-green-800";
    case "Non confirmé":
      return "bg-blue-100 text-blue-800";
    case "Terminé":
      return "bg-gray-100 text-gray-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

const InternProfileDetails = ({ intern, onEdit, onClose }) => {
  const [isReportSubmitted, setIsReportSubmitted] = useState(intern.isReportSubmitted);
  const [reportSubmissionDate, setReportSubmissionDate] = useState(intern.reportSubmissionDate);
  const [isAttestationImported, setIsAttestationImported] = useState(intern.isAttestationImported);
  const [attestationImportDate, setAttestationImportDate] = useState(intern.attestationImportDate);
  const [validationError, setValidationError] = useState("");

  const handleUpdate = () => {
    // Validation de la date
    if (isReportSubmitted && isAttestationImported) {
      if (reportSubmissionDate && attestationImportDate) {
        if (new Date(reportSubmissionDate) >= new Date(attestationImportDate)) {
          setValidationError(
            "La date de remise du rapport doit être antérieure à la date d'importation de l'attestation."
          );
          return; // Empêche la mise à jour si la validation échoue
        }
      }
    }
    setValidationError(""); // Efface l'erreur si la validation réussit

    // Créez le nouvel objet stagiaire
    const updatedIntern = {
      ...intern,
      isReportSubmitted,
      reportSubmissionDate,
      isAttestationImported,
      attestationImportDate,
    };
    onEdit(updatedIntern);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <img
            src={intern.profilePictureUrl}
            alt={`Photo de profil de ${intern.name}`}
            className="w-16 h-16 rounded-full"
          />
          <div>
            <h2 className="text-2xl font-bold">{intern.name}</h2>
            <Badge className={getStatusColor(intern.status)}>
              {intern.status}
            </Badge>
          </div>
        </div>
        <div className="flex space-x-2">
          <PDFDownloadLink
            document={<InternProfileDocument intern={intern} />}
            fileName={`${intern.name}_profil.pdf`}
          >
            {({ loading }) => (
              <Button variant="outline" disabled={loading}>
                <Download className="w-4 h-4 mr-2" />
                {loading ? "Chargement..." : "Exporter PDF"}
              </Button>
            )}
          </PDFDownloadLink>
          <Button onClick={handleUpdate}>
            <Edit className="w-4 h-4 mr-2" />
            Modifier
          </Button>
        </div>
      </div>
      <Tabs defaultValue="info" className="space-y-6">
        <TabsList>
          <TabsTrigger value="info">Informations</TabsTrigger>
          <TabsTrigger value="internship">Stage</TabsTrigger>
          <TabsTrigger value="absences">Absences</TabsTrigger>
        </TabsList>
        <TabsContent value="info">
          <Card>
            <CardHeader>
              <CardTitle>Informations Personnelles</CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Mail className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Email</p>
                    <p className="font-medium">{intern.email}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Téléphone</p>
                    <p className="font-medium">{intern.phone}</p>
                  </div>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <Building className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Type de stage</p>
                    <p className="font-medium">{intern.internship}</p>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <Calendar className="w-5 h-5 text-gray-500" />
                  <div>
                    <p className="text-sm text-gray-500">Durée</p>
                    <p className="font-medium">
                      {intern.startDate} à {intern.endDate}
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="internship">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Situation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">État</p>
                  <p className="font-medium">{intern.status}</p>
                </div>
              </CardContent>
              <CardHeader>
                <CardTitle>Superviseurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">
                    Superviseur entreprise
                  </p>
                  <p className="font-medium">{intern.companySupervisor}</p>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Affectation</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-gray-500">Projet</p>
                  <p className="font-medium">{intern.project}</p>
                </div>
              </CardContent>
              {intern.status === "Terminé" && (
                <>
                  <CardHeader>
                    <CardTitle>Documents</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="rapport-rendu"
                        checked={isReportSubmitted}
                        onCheckedChange={(checked) => {
                          setIsReportSubmitted(checked);
                          if (!checked) setReportSubmissionDate(null);
                        }}
                      />
                      <label
                        htmlFor="rapport-rendu"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Rapport rendu
                      </label>
                      {isReportSubmitted && (
                        <Input
                          type="date"
                          value={reportSubmissionDate || ""}
                          onChange={(e) => setReportSubmissionDate(e.target.value)}
                          className="max-w-[150px] ml-auto"
                        />
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="attestation-importee"
                        checked={isAttestationImported}
                        onCheckedChange={(checked) => {
                          setIsAttestationImported(checked);
                          if (!checked) setAttestationImportDate(null);
                        }}
                      />
                      <label
                        htmlFor="attestation-importee"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Attestation importée
                      </label>
                      {isAttestationImported && (
                        <Input
                          type="date"
                          value={attestationImportDate || ""}
                          onChange={(e) => setAttestationImportDate(e.target.value)}
                          className="max-w-[150px] ml-auto"
                        />
                      )}
                    </div>
                    {validationError && (
                      <p className="text-sm text-red-500 mt-2">{validationError}</p>
                    )}
                  </CardContent>
                </>
              )}
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="absences">
          <Card>
            <CardHeader>
              <CardTitle>Résumé des Absences</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8">
                <p className="text-2xl font-bold text-gray-900">
                  {intern.absences}
                </p>
                <p className="text-gray-500">Total des absences</p>
                <p className="text-sm text-green-600 mt-2">
                  Dans les limites acceptables
                </p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export const InternsSection = () => {
  const [interns, setInterns] = useState<Intern[]>(mockInterns as Intern[]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterProject, setFilterProject] = useState("all");
  const [showAddInternForm, setShowAddInternForm] = useState(false);
  const [selectedIntern, setSelectedIntern] = useState<Intern | null>(null);
  const [internToEdit, setInternToEdit] = useState<Intern | null>(null);
  const [displayMode, setDisplayMode] = useState<"grid" | "list">("grid");

  const projects = useMemo(() => {
    const uniqueProjects = Array.from(
      new Set(mockInterns.map((intern) => intern.project))
    );
    return ["all", ...uniqueProjects];
  }, []);

  const filteredInterns = useMemo(() => {
    return mockInterns.filter((intern) => {
      const matchesSearch =
        intern.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.internship.toLowerCase().includes(searchTerm.toLowerCase()) ||
        intern.project.toLowerCase().includes(searchTerm.toLowerCase())

      const matchesStatus = filterStatus === "all" || intern.status === filterStatus;
      const matchesProject =
        filterProject === "all" || intern.project === filterProject;

      return matchesSearch && matchesStatus && matchesProject;
    });
  }, [searchTerm, filterStatus, filterProject]);

  const groupedInterns = useMemo(() => {
    return filteredInterns.reduce((acc, intern) => {
      const project = intern.project;
      if (!acc[project]) {
        acc[project] = [];
      }
      acc[project].push(intern);
      return acc;
    }, {} as Record<string, typeof mockInterns>);
  }, [filteredInterns]);

  const handleExport = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      Object.keys(groupedInterns)
        .map((project) => {
          const departmentHeader = `Département: ${project}\n`;
          const internsCsv = [
            [
              "ID",
              "Nom",
              "Email",
              "Téléphone",
              "Type de stage",
              "Date de début",
              "Date de fin",
              "Statut",
              "Superviseur entreprise",
              "Projet",
              "Absences",
              "Rapport rendu",
              "Date de remise du rapport",
              "Attestation importée",
              "Date d'importation de l'attestation",
              "Photo de profil"
            ].join(","),
            ...groupedInterns[project].map((intern) =>
              [
                intern.id,
                intern.name,
                intern.email,
                intern.phone,
                intern.internship,
                intern.startDate,
                intern.endDate,
                intern.status,
                intern.companySupervisor,
                intern.project,
                intern.absences,
                intern.isReportSubmitted ? "Oui" : "Non",
                intern.reportSubmissionDate || "",
                intern.isAttestationImported ? "Oui" : "Non",
                intern.attestationImportDate || "",
                intern.profilePictureUrl
              ].join(",")
            ),
          ].join("\n");
          return internsCsv;
        })
        .join("\n\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute(
      "download",
      "donnees_stagiaires_par_projet_" + filterStatus + ".csv"
    );
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleSave = (updatedIntern: Intern) => {
    setInterns(
      interns.map((intern) =>
        intern.id === updatedIntern.id ? updatedIntern : intern
      )
    );
    setInternToEdit(null);
    setSelectedIntern(updatedIntern);
  };

  const handleViewProfile = (intern: Intern) => {
    setSelectedIntern(intern);
  };

  const handleCloseProfile = () => {
    setSelectedIntern(null);
  };
  
  if (showAddInternForm) {
    return <AddInternForm onCancel={() => setShowAddInternForm(false)} />;
  }

  if (internToEdit) {
    return (
      <EditInternForm
        intern={internToEdit}
        onCancel={() => setInternToEdit(null)}
        onSave={handleSave}
      />
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Gestion des Stagiaires</h2>
        <Button onClick={() => setShowAddInternForm(true)}>
          <Plus className="w-4 h-4 mr-2" /> Ajouter un stagiaire
        </Button>
      </div>
      <div className="flex space-x-4 items-center">
        <Input
          placeholder="Rechercher par nom, prénom, projet..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
        <Tabs value={filterStatus} onValueChange={setFilterStatus} className="max-w-md">
          <TabsList>
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="Confirmé">Confirmé</TabsTrigger>
            <TabsTrigger value="Non confirmé">Non confirmé</TabsTrigger>
            <TabsTrigger value="Terminé">Terminé</TabsTrigger>
          </TabsList>
        </Tabs>
        <select
          value={filterProject}
          onChange={(e) => setFilterProject(e.target.value)}
          className="border rounded-md px-3 py-2 text-sm max-w-xs"
        >
          {projects.map((project) => (
            <option key={project} value={project}>
              {project === "all" ? "Tous les projets" : project}
            </option>
          ))}
        </select>
        <Button variant="outline" onClick={handleExport}>
          <Download className="w-4 h-4 mr-2" /> Exporter
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDisplayMode("grid")}
          className={displayMode === "grid" ? "bg-gray-200" : ""}
        >
          <LayoutGrid className="w-5 h-5" />
        </Button>
        <Button
          variant="outline"
          size="icon"
          onClick={() => setDisplayMode("list")}
          className={displayMode === "list" ? "bg-gray-200" : ""}
        >
          <List className="w-5 h-5" />
        </Button>
      </div>

      {Object.keys(groupedInterns).length > 0 ? (
        Object.keys(groupedInterns)
          .sort()
          .map((project) => (
            <div key={project} className="space-y-4">
              <h3 className="text-xl font-semibold mt-6">
                {project} ({groupedInterns[project].length})
              </h3>
              <div
                className={
                  displayMode === "grid"
                    ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
                    : "space-y-4"
                }
              >
                {groupedInterns[project].map((intern) => (
                  <Card
                    key={intern.id}
                    className={`shadow-sm hover:shadow-md transition-shadow relative ${
                      displayMode === "list" ? "flex items-center p-4" : ""
                    }`}
                  >
                    <CardHeader
                      className={
                        displayMode === "list"
                          ? "flex-grow-0 w-1/4 pr-4"
                          : "flex flex-row items-center gap-4"
                      }
                    >
                      <img
                        src={intern.profilePictureUrl}
                        alt={`Photo de profil de ${intern.name}`}
                        className="w-10 h-10 rounded-full"
                      />
                      <CardTitle
                        className={`flex items-center justify-between ${
                          displayMode === "list" ? "text-lg mb-0" : "text-lg"
                        }`}
                      >
                        <span 
                          onClick={() => handleViewProfile(intern as Intern)} 
                          className={`cursor-pointer font-bold hover:underline ${displayMode === "list" ? "flex-grow" : ""}`}
                        >
                          {intern.name}
                        </span>
                        <Badge
                          variant={
                            intern.status === "Confirmé"
                              ? "default"
                              : intern.status === "Non confirmé"
                              ? "secondary"
                              : "outline"
                          }
                          className={getStatusColor(intern.status)}
                        >
                          {intern.status}
                        </Badge>
                      </CardTitle>
                    </CardHeader>
                    <CardContent
                      className={`space-y-2 ${
                        displayMode === "list" ? "flex-grow" : ""
                      }`}
                    >
                      <div
                        className={
                          displayMode === "list"
                            ? "grid grid-cols-2 gap-x-4 gap-y-2 text-sm text-gray-700"
                            : "space-y-2 text-sm text-gray-700"
                        }
                      >
                        <div className="flex items-center space-x-2">
                          <Phone className="w-4 h-4 text-gray-500" />
                          <span>{intern.phone}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Building className="w-4 h-4 text-gray-500" />
                          <span>{intern.internship}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Calendar className="w-4 h-4 text-gray-500" />
                          <span>{intern.startDate}</span>
                        </div>
                      </div>
                      <div
                        className={
                          displayMode === "list"
                            ? "flex justify-between text-sm pt-3 border-t mt-4"
                            : "flex justify-between text-sm pt-3 border-t"
                        }
                      >
                      </div>
                      <div
                        className={
                          displayMode === "list" ? "flex gap-2 pt-2 justify-end" : "flex gap-2 pt-2"
                        }
                      >
                        <Button
                          size="sm"
                          variant="outline"
                          className="flex-1"
                          onClick={() => handleViewProfile(intern as Intern)}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          Voir
                        </Button>
                        {intern.status !== "Terminé" && (
                          <Button
                            size="sm"
                            variant="outline"
                            className="flex-1"
                            onClick={() => setInternToEdit(intern as Intern)}
                          >
                            <Edit className="w-4 h-4 mr-1" />
                            Modifier
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ))
      ) : (
        <Card>
          <CardContent className="text-center py-8">
            <p className="text-gray-500">
              Aucun stagiaire trouvé correspondant à vos critères.
            </p>
          </CardContent>
        </Card>
      )}
      <Dialog open={!!selectedIntern} onOpenChange={handleCloseProfile}>
        <DialogContent className="sm:max-w-[700px] h-[90vh] overflow-y-auto">
          {selectedIntern && (
            <InternProfileDetails
              intern={selectedIntern}
              onEdit={handleSave}
              onClose={handleCloseProfile}
            />
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};