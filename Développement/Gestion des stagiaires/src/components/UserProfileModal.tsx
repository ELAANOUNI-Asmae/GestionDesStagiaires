// src/components/UserProfileModal.tsx
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Copy, ExternalLink } from "lucide-react";
import { toast } from "sonner"; // Pour les notifications de copie
import { useNavigate } from "react-router-dom";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  userEmail: string;
  userName: string; // ✨ Nouvelle prop pour le nom de l'utilisateur
}

export const UserProfileModal = ({ isOpen, onClose, userEmail, userName }: UserProfileModalProps) => {

  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/deliverables");
  };


  const handleCopyEmail = () => {
    navigator.clipboard.writeText(userEmail);
    toast.success("Email copié dans le presse-papiers !");
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Informations du Profil</DialogTitle>
          <DialogDescription>
            Consultez et gérez vos informations de profil.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          {/* Affichage du nom de l'utilisateur */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="name" className="text-right">
              Nom
            </Label>
            <div className="col-span-3">
              <Input
                id="name"
                value={userName}
                readOnly
                className="w-full"
              />
            </div>
          </div>
          {/* Affichage de l'email */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="email" className="text-right">
              Email
            </Label>
            <div className="col-span-3 flex items-center">
              <Input
                id="email"
                value={userEmail}
                readOnly
                className="col-span-2 mr-2"
              />
              <Button type="button" size="sm" variant="ghost" onClick={handleCopyEmail}>
                <Copy className="h-4 w-4" />
                <span className="sr-only">Copier l'email</span>
              </Button>
            </div>
          </div>
          {/* Affichage du mot de passe (masqué) */}
          <div className="grid grid-cols-4 items-center gap-4">
            <Label htmlFor="password" className="text-right">
              Mot de passe
            </Label>
            <div className="col-span-3 flex items-center">
              <Input
                id="password"
                type="password"
                value="********" // Ne jamais afficher le vrai mot de passe
                readOnly
                className="col-span-2 mr-2"
              />
            </div>
          </div>
        </div>
        <div className="flex justify-end pt-4 border-t">
          <Button onClick={onClose}>Fermer</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};