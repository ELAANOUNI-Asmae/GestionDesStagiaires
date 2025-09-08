import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Intern } from "./types";
import { mockInterns } from "./InternsSection";
import { Download } from "lucide-react";
import { InternType } from "./AddInternForm";
import {
  PDFDownloadLink,
  Document,
  Page,
  Text,
  View,
  StyleSheet,
} from "@react-pdf/renderer";

interface GroupData {
  id: number;
  name: string;
  project: string;
  interns: Intern[];
  internCount: number;
}

const pdfStyles = StyleSheet.create({
  page: { flexDirection: 'column', padding: 30 },
  title: { fontSize: 24, textAlign: 'center', marginBottom: 20 },
  section: { marginBottom: 15 },
  subtitle: { fontSize: 18, marginBottom: 10 },
  text: { fontSize: 12, marginBottom: 5 },
});

const GroupPdfDocument = ({ group }: { group: GroupData }) => (
  <Document>
    <Page size="A4" style={pdfStyles.page}>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.title}>Détails du groupe : {group.name}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subtitle}>Informations du groupe</Text>
        <Text style={pdfStyles.text}>Nom du groupe : {group.name}</Text>
        <Text style={pdfStyles.text}>ID du groupe : {group.id}</Text>
        <Text style={pdfStyles.text}>Projet : {group.project}</Text>
        <Text style={pdfStyles.text}>Nombre de stagiaires : {group.internCount}</Text>
      </View>
      <View style={pdfStyles.section}>
        <Text style={pdfStyles.subtitle}>Membres du groupe</Text>
        {group.interns.map((intern, index) => (
          <Text key={index} style={pdfStyles.text}>- {intern.name} ({intern.email})</Text>
        ))}
      </View>
    </Page>
  </Document>
);

export const GroupsSection = () => {
  const [selectedGroup, setSelectedGroup] = useState<GroupData | null>(null);
  const [searchTerm, setSearchTerm] = useState("");

  const interns: Intern[] = mockInterns as Intern[];

  const groupedData = useMemo(() => {
    const groups: Record<string, { interns: Intern[] }> = {};
    
    interns.forEach(intern => {
      if (intern.project) {
        if (!groups[intern.project]) {
          groups[intern.project] = {
            interns: []
          };
        }
        groups[intern.project].interns.push(intern);
      }
    });

    return Object.keys(groups).map((groupName, index) => {
      const groupInterns = groups[groupName].interns;
      const project = groupInterns[0]?.project || "N/A";
      const internCount = groupInterns.length;

      return {
        id: index + 1,
        name: groupName,
        project: project,
        interns: groupInterns,
        internCount: internCount,
      };
    }).sort((a, b) => a.name.localeCompare(b.name));
  }, [interns]);

  const filteredGroups = useMemo(() => {
    if (!searchTerm) {
      return groupedData;
    }
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    return groupedData.filter(group => 
      group.name.toLowerCase().includes(lowercasedSearchTerm)
    );
  }, [groupedData, searchTerm]);

  const stageStats = useMemo(() => {
    const stats: Record<InternType, number> = {
      PFA: 0,
      PFE: 0,
      Initiation: 0,
      Application: 0,
      Observation: 0
    };
    
    if (selectedGroup) {
      selectedGroup.interns.forEach(intern => {
        const internshipType = intern.internship as InternType;
        if (internshipType && stats[internshipType] !== undefined) {
          stats[internshipType]++;
        }
      });
    }
    
    return stats;
  }, [selectedGroup]);

  const handleExportCsv = (group: GroupData) => {
    const csvContent = "data:text/csv;charset=utf-8,"
      + "Group ID,Group Name,Project,Intern Count\n"
      + `${group.id},"${group.name}","${group.project}",${group.internCount}\n\n`
      + "Interns in Group\n"
      + "Name,Email,Phone,School,Internship_Type\n"
      + group.interns.map(intern => 
          `"${intern.name}","${intern.email}","${intern.phone}","${intern.internship}"`
        ).join("\n");

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", `group_${group.name}_data.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Groupes</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Section gauche : Liste des groupes (plus large) */}
        <div className="col-span-1 md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Liste des Groupes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="mb-4">
                <Input
                  type="text"
                  placeholder="Rechercher par nom de groupe..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
              {filteredGroups.length > 0 ? (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Nom du Groupe</TableHead>
                      <TableHead>Nb. Stagiaires</TableHead>
                      <TableHead>Projet</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredGroups.map((group) => (
                      <TableRow 
                        key={group.name} 
                        onClick={() => setSelectedGroup(group)}
                        className={`cursor-pointer hover:bg-gray-100 ${selectedGroup?.name === group.name ? 'bg-blue-50' : ''}`}
                      >
                        <TableCell className="font-medium">{group.name}</TableCell>
                        <TableCell>{group.internCount}</TableCell>
                        <TableCell>{group.project}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              ) : (
                <p className="text-gray-500 text-center py-4">
                  Aucun groupe trouvé.
                </p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Section droite : Informations du groupe (plus petite) */}
        <div className="col-span-1">
          {selectedGroup ? (
            <>
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Informations Complémentaires</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div>
                      <p className="text-sm text-gray-500">Nom du Groupe</p>
                      <p className="font-medium">{selectedGroup.name}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Projet</p>
                      <p className="font-medium">{selectedGroup.project}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Nombre de Stagiaires</p>
                      <p className="font-medium">{selectedGroup.internCount}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">ID du Groupe</p>
                      <p className="font-medium">{selectedGroup.id}</p>
                    </div>
                  </div>
                  
                  <div className="space-y-2 pt-4">
                    <p className="text-sm font-semibold">Membres du Groupe :</p>
                    <ul className="text-sm list-disc list-inside">
                      {selectedGroup.interns.map(intern => (
                        <li key={intern.id}>{intern.name}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="flex flex-col space-y-2 pt-4 border-t mt-4">
                    <PDFDownloadLink document={<GroupPdfDocument group={selectedGroup} />} fileName={`group_${selectedGroup.name}_details.pdf`}>
                      {({ loading }) => (
                        <Button className="w-full" disabled={loading}>
                          <Download className="w-4 h-4 mr-2" />
                          Exporter en PDF
                        </Button>
                      )}
                    </PDFDownloadLink>
                    <Button onClick={() => handleExportCsv(selectedGroup)} variant="outline" className="w-full">
                      <Download className="w-4 h-4 mr-2" />
                      Exporter en CSV
                    </Button>
                  </div>
                </CardContent>
              </Card>
              {/* Section Statistiques du Groupe Sélectionné */}
              <Card className="mt-6">
                <CardHeader>
                  <CardTitle className="text-lg">Statistiques des Types de Stage</CardTitle>
                </CardHeader>
                <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {Object.keys(stageStats).map((type) => (
                    <div key={type} className="flex flex-col items-center justify-center p-4 rounded-lg border bg-muted">
                      <span className="text-3xl font-bold">{stageStats[type as InternType]}</span>
                      <span className="text-sm text-muted-foreground mt-1">{type}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </>
          ) : (
            <Card>
              <CardContent className="text-gray-500 text-center py-8">
                Cliquez sur un groupe dans le tableau pour voir ses détails.
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};