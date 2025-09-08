import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mockInterns } from "./InternsSection";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import { Download } from "lucide-react";

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8'];

const isInternActiveInMonthAndYear = (intern, month, year) => {
  const internStartDate = new Date(intern.startDate);
  const internEndDate = new Date(intern.endDate);
  
  const filterMonthStart = new Date(year, month - 1, 1);
  const filterMonthEnd = new Date(year, month, 0);

  return (
    internStartDate <= filterMonthEnd && internEndDate >= filterMonthStart
  );
};

const calculateInternshipStats = (month, year) => {
  const filteredInterns = mockInterns.filter(intern => isInternActiveInMonthAndYear(intern, month, year));
  
  const stats = new Map();
  
  filteredInterns.forEach((intern) => {
    const { internship, project } = intern;
    if (!stats.has(internship)) {
      stats.set(internship, {
        title: internship,
        interns: 0,
        projects: new Set(),
      });
    }
    const typeStats = stats.get(internship);
    typeStats.interns += 1;
    typeStats.projects.add(project);
  });
  
  return Array.from(stats.values()).map((type) => ({
    title: type.title,
    interns: type.interns,
    projects: type.projects.size,
  }));
};

const prepareChartData = (month, year) => {
  const filteredInterns = mockInterns.filter(intern => isInternActiveInMonthAndYear(intern, month, year));

  const counts = filteredInterns.reduce((acc, intern) => {
    acc[intern.internship] = (acc[intern.internship] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  return Object.keys(counts).map(key => ({
    name: key,
    value: counts[key],
  }));
};

const getUniqueYears = () => {
    const years = new Set<number>();
    mockInterns.forEach(intern => {
        years.add(new Date(intern.startDate).getFullYear());
        years.add(new Date(intern.endDate).getFullYear());
    });
    return Array.from(years).sort();
};

const months = Array.from({ length: 12 }, (_, i) => i + 1);

const exportToCsv = (internshipType, month, year) => {
  const filteredInterns = mockInterns.filter(intern => intern.internship === internshipType);
  
  const headers = ["Nom du stagiaire", "Date de début", "Date de fin", "Groupe", "Projet"];
  
  const csvData = filteredInterns.map(intern => {
    return [
      intern.name,
      intern.startDate,
      intern.endDate,
      intern.project,
    ].join(",");
  });
  
  const csvContent = [headers.join(","), ...csvData].join("\n");
  
  const monthName = new Date(year, month - 1, 1).toLocaleString('fr-FR', { month: 'long' });
  const fileName = `${internshipType}_${monthName}_${year}.csv`;

  const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  const url = URL.createObjectURL(blob);
  link.setAttribute("href", url);
  link.setAttribute("download", fileName);
  link.style.visibility = "hidden";
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
};

export const InternshipsSection = () => {
  const uniqueYears = useMemo(() => getUniqueYears(), []);
  const [selectedYear, setSelectedYear] = useState<number>(uniqueYears.length > 0 ? uniqueYears[0] : new Date().getFullYear());
  const [selectedMonth, setSelectedMonth] = useState(new Date().getMonth() + 1);
  
  const internshipTypes = useMemo(() => calculateInternshipStats(selectedMonth, selectedYear), [selectedMonth, selectedYear]);
  const chartData = useMemo(() => prepareChartData(selectedMonth, selectedYear), [selectedMonth, selectedYear]);
  
  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des Stages</h2>
      
      {/* Sélecteurs de mois et d'année */}
      <div className="flex items-center space-x-4">
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
      </div>

      {/* Section des cartes */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {internshipTypes.length > 0 ? (
          internshipTypes.map((type, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle>{type.title}</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <p className="text-gray-600">
                  <span className="font-semibold">{type.interns}</span>
                  {` `}
                  stagiaires
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold">{type.projects}</span>
                  {` `}
                  projets
                </p>
                <Button 
                  size="sm" 
                  variant="outline" 
                  className="w-full flex items-center gap-2 mt-4"
                  onClick={() => exportToCsv(type.title, selectedMonth, selectedYear)}
                >
                  <Download className="w-4 h-4" />
                  Exporter en CSV
                </Button>
              </CardContent>
            </Card>
          ))
        ) : (
          <Card>
            <CardContent>
              <p className="text-gray-600">Aucun stage trouvé pour cette période.</p>
            </CardContent>
          </Card>
        )}
      </div>

      {/* Section du graphique en secteurs */}
      <Card>
        <CardHeader>
          <CardTitle>Répartition des types de stages</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center h-[300px]">
            {chartData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={100}
                    fill="#8884d8"
                    label
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            ) : (
              <p className="text-gray-600">Pas de données pour le graphique pour cette période.</p>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};