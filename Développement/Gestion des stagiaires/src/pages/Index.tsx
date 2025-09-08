import { useState } from "react";
import { Sidebar } from "@/components/Sidebar";
import { Header } from "@/components/Header";
import { Dashboard } from "@/components/Dashboard";
import { InternsSection } from "@/components/InternsSection";
import { GroupsSection } from "@/components/GroupsSection";
import { InternshipsSection } from "@/components/InternshipsSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { AbsencesSection } from "@/components/AbsencesSection";
import { DeliverablesSection } from "@/components/DeliverablesSection";
import { UsersSection } from "@/components/UsersSection";

const Index = () => {
  const [activeSection, setActiveSection] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const renderActiveSection = () => {
    switch (activeSection) {
      case "Dashboard":
        return <Dashboard onNavigate={setActiveSection} />;
      case "Interns":
        return <InternsSection />;
      case "Groups":
        return <GroupsSection />;
      case "Internships":
        return <InternshipsSection />;
      case "Projects":
        return <ProjectsSection />;
      case "Absences":
        return <AbsencesSection />;
      case "Deliverables":
        return <DeliverablesSection />;
      case "Users":
        return <UsersSection />;
      default:
        return <Dashboard onNavigate={setActiveSection} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <Sidebar 
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />
      
      <div className={`flex-1 flex flex-col transition-all duration-300 ${sidebarOpen ? 'ml-64' : 'ml-16'}`}>
        <Header 
          activeSection={activeSection}
          toggleSidebar={() => setSidebarOpen(!sidebarOpen)}
        />
        
        <main className="flex-1 p-6 overflow-auto">
          {renderActiveSection()}
        </main>
        
        <footer className="bg-white border-t px-6 py-4 text-sm text-gray-600">
          <div className="flex justify-between items-center">
            <div className="flex space-x-4">
              <a href="#" className="hover:text-blue-600 transition-colors">Legal Notices</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 transition-colors">Administrative Contacts</a>
            </div>
            <div>
              © 2025 Internship Management Platform
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default Index;
