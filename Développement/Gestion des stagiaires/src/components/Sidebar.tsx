// src/components/Sidebar.tsx
import { 
  LayoutDashboard, 
  Users, 
  UsersRound, 
  Building, 
  FolderOpen, 
  CalendarX, 
  FileText, 
  Settings,
  LogOut,
  Menu
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useNavigate } from "react-router-dom"; // Importation de useNavigate

interface SidebarProps {
  activeSection: string;
  setActiveSection: (section: string) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

const menuItems = [
  { name: "Dashboard", icon: LayoutDashboard, color: "text-blue-600" },
  { name: "Interns", icon: Users, color: "text-green-600" },
  { name: "Groups", icon: UsersRound, color: "text-purple-600" },
  { name: "Internships", icon: Building, color: "text-orange-600" },
  { name: "Projects", icon: FolderOpen, color: "text-indigo-600" },
  { name: "Absences", icon: CalendarX, color: "text-red-600" },
  { name: "Deliverables", icon: FileText, color: "text-yellow-600" },
  { name: "Users", icon: Settings, color: "text-gray-600" },
];

export const Sidebar = ({ activeSection, setActiveSection, isOpen, setIsOpen }: SidebarProps) => {
  const navigate = useNavigate(); // Initialisation du hook de navigation

  // Nouvelle fonction pour gérer la déconnexion
  const handleLogout = () => {
    // 1. Logique de déconnexion ici (par exemple, effacer le token d'authentification)
    console.log("Déconnexion de l'utilisateur...");

    // 2. Redirection vers la page de connexion
    navigate("/login");
  };

  return (
    <div className={cn(
      "fixed left-0 top-0 h-full bg-white shadow-lg border-r transition-all duration-300 z-50",
      isOpen ? "w-64" : "w-16"
    )}>
      <div className="p-4 border-b">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-600 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#0100bb" }}>
            <img src="/public/logo_Yool.png" className="w-50 h-50 text-white" />
          </div>
          {isOpen && (
            <h1 className="text-lg font-bold text-gray-800">
              Internship Management
            </h1>
          )}
        </div>
      </div>
      
      <nav className="mt-6">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = activeSection === item.name;
          
          return (
            <button
              key={item.name}
              onClick={() => setActiveSection(item.name)}
              className={cn(
                "w-full flex items-center px-4 py-3 text-left transition-all duration-200 hover:bg-gray-50",
                isActive && "bg-blue-50 border-r-2 border-blue-600"
              )}
            >
              <Icon className={cn(
                "w-5 h-5 flex-shrink-0",
                isActive ? "text-blue-600" : item.color
              )} />
              {isOpen && (
                <span className={cn(
                  "ml-3 font-medium",
                  isActive ? "text-blue-600" : "text-gray-700"
                )}>
                  {item.name}
                </span>
              )}
            </button>
          );
        })}
        
        <div className="mt-8 pt-4 border-t">
          {/* Ajout de l'événement onClick pour gérer la déconnexion */}
          <button 
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-left transition-colors hover:bg-red-50 text-red-600"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            {isOpen && <span className="ml-3 font-medium">Logout</span>}
          </button>
        </div>
      </nav>
    </div>
  );
};