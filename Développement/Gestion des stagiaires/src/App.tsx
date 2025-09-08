// src/App.tsx
import { useState } from 'react';
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"; // Importez Navigate
import { Sidebar } from "./components/Sidebar";
import { LoginPage } from "./pages/LoginPage";
import { DeliverablesSection } from "./components/DeliverablesSection";
import { UsersSection } from "./components/UsersSection";
import NotFound from "./pages/NotFound";
import Index from "./pages/Index";
import { Dashboard } from './components/Dashboard';

const queryClient = new QueryClient();

// Composant pour le layout principal avec la Sidebar
const MainLayout = () => {
  const [activeSection, setActiveSection] = useState('Dashboard');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen">
      <Sidebar
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
      <div className="flex-1 p-8">
        <Routes>
          {/* Les pages à afficher avec la Sidebar */}
          <Route path='/dashboard' element={<Index />} />
          <Route path="/deliverables" element={<DeliverablesSection />} />
          <Route path="/users" element={<UsersSection />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </div>
  );
};

export const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          {/* Redirection de la racine vers /login */}
          <Route path="/" element={<Navigate to="/login" replace />} /> {/* Nouvelle ligne */}
          {/* Route pour la page de connexion, sans la Sidebar */}
          <Route path="/login" element={<LoginPage />} />
          {/* Route principale pour le layout avec la Sidebar (maintenant, toutes les autres routes) */}
          <Route path="/*" element={<MainLayout />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;