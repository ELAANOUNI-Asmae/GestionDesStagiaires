// src/components/Header.tsx
import React, { useState } from "react";
import { Search, Bell, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { UserProfileModal } from "./UserProfileModal";
import { UsersSection } from "./UsersSection";

interface HeaderProps {
  activeSection: string;
  toggleSidebar: () => void;
}

export const Header = ({ activeSection, toggleSidebar }: HeaderProps) => {
  const [notifications, setNotifications] = useState([
    { name: "Nouvelle inscription d'internes", time: "Il y a 5 min" },
    { name: "Projet 'Alpha' mis à jour", time: "Il y a 1 heure" },
    { name: "Absence signalée: John Doe", time: "Il y a 3 heures" },
  ]);

  const [showProfileModal, setShowProfileModal] = useState(false);

  const toggleProfileModal = () => {
    setShowProfileModal(!showProfileModal);
  };

  return (
    <header className="bg-white shadow-sm border-b px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="lg:hidden"
          >
            <Menu className="w-5 h-5" />
          </Button>
          <h2 className="text-xl font-semibold text-gray-800">
            {activeSection}
          </h2>
        </div>

        <div className="flex items-center space-x-4">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="ghost" size="sm" className="relative">
                <Bell className="w-5 h-5" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full flex items-center justify-center text-xs text-white">
                  </span>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80 p-0" align="end">
              <div className="p-4 border-b">
                <h4 className="font-semibold text-lg">Notifications</h4>
                <p className="text-sm text-gray-500">
                  Vous avez {notifications.length} nouvelles activités.
                </p>
              </div>
              <div className="max-h-60 overflow-y-auto">
                {notifications.length === 0 ? (
                  <p className="p-4 text-sm text-gray-500 text-center">
                    Aucune nouvelle notification.
                  </p>
                ) : (
                  <div className="divide-y divide-gray-100">
                    {notifications.map((activity, index) => (
                      <div
                        key={index}
                        className="flex items-start space-x-3 p-4 hover:bg-gray-50 cursor-pointer"
                      >
                        <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                        <div>
                          <p className="text-sm text-gray-800">
                            {activity.name}
                          </p>
                          <p className="text-xs text-gray-400 mt-1">
                            {activity.time}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
              {notifications.length > 0 && (
                <div className="p-2 border-t">
                  <Button variant="ghost" className="w-full text-blue-600 text-sm">
                    Voir toutes les notifications
                  </Button>
                </div>
              )}
            </PopoverContent>
          </Popover>

          <Button
            variant="ghost"
            className="flex items-center space-x-2 p-2 hover:bg-gray-100 rounded-md cursor-pointer"
            onClick={toggleProfileModal}
          >
            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-gray-700 text-sm font-medium">John Doe</span>
          </Button>
        </div>
      </div>

      <UserProfileModal
        isOpen={showProfileModal}
        onClose={toggleProfileModal}
        userEmail="john.doe@example.com"
        userName="John DOE"
      />
    </header>
  );
};