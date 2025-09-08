// src/components/UsersSection.tsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export const UsersSection = () => {
  // État pour la gestion du formulaire de l'email
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [emailSuccess, setEmailSuccess] = useState("");

  // État pour la gestion du formulaire du mot de passe
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  // Fonction de validation et de mise à jour de l'email
  const handleEmailUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setEmailError("");
    setEmailSuccess("");

    if (!email) {
      setEmailError("Veuillez saisir une adresse email.");
      return;
    }

    // Ici, vous ajouteriez la logique d'appel à votre API pour mettre à jour l'email
    // Par exemple :
    // try {
    //   await updateUserEmail(email);
    //   setEmailSuccess("Votre email a été mis à jour avec succès !");
    // } catch (err) {
    //   setEmailError("Échec de la mise à jour de l'email.");
    // }
    
    // Simulation d'une mise à jour réussie
    setTimeout(() => {
      setEmailSuccess("Votre email a été mis à jour avec succès !");
      setEmail("");
    }, 1000);
  };

  // Fonction de validation et de mise à jour du mot de passe
  const handlePasswordUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");

    if (!currentPassword || !newPassword || !confirmNewPassword) {
      setPasswordError("Tous les champs sont requis.");
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setPasswordError("Le nouveau mot de passe et sa confirmation ne correspondent pas.");
      return;
    }
    
    // Ajoutez d'autres règles de validation ici (ex: longueur minimale du mot de passe)
    if (newPassword.length < 8) {
      setPasswordError("Le nouveau mot de passe doit contenir au moins 8 caractères.");
      return;
    }

    // Ici, vous ajouteriez la logique d'appel à votre API pour mettre à jour le mot de passe
    // Par exemple :
    // try {
    //   await updateUserPassword(currentPassword, newPassword);
    //   setPasswordSuccess("Votre mot de passe a été mis à jour avec succès !");
    // } catch (err) {
    //   setPasswordError("Échec de la mise à jour du mot de passe. Vérifiez votre mot de passe actuel.");
    // }

    // Simulation d'une mise à jour réussie
    setTimeout(() => {
      setPasswordSuccess("Votre mot de passe a été mis à jour avec succès !");
      setCurrentPassword("");
      setNewPassword("");
      setConfirmNewPassword("");
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Gestion des utilisateurs</h2>

      {/* Section pour la mise à jour de l'email */}
      <Card>
        <CardHeader>
          <CardTitle>Modifier l'adresse email</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleEmailUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Nouvelle adresse email</Label>
              <Input
                id="email"
                type="email"
                placeholder="entrez votre nouvelle adresse email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
            {emailSuccess && <p className="text-sm text-green-500">{emailSuccess}</p>}
            <Button type="submit" className="w-full">
              Mettre à jour l'email
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Section pour la mise à jour du mot de passe */}
      <Card>
        <CardHeader>
          <CardTitle>Modifier le mot de passe</CardTitle>
        </CardHeader>
        <CardContent>
          <form onSubmit={handlePasswordUpdate} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Mot de passe actuel</Label>
              <Input
                id="current-password"
                type="password"
                placeholder="Votre mot de passe actuel"
                value={currentPassword}
                onChange={(e) => setCurrentPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="new-password">Nouveau mot de passe</Label>
              <Input
                id="new-password"
                type="password"
                placeholder="Entrez votre nouveau mot de passe"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-new-password">Confirmer le nouveau mot de passe</Label>
              <Input
                id="confirm-new-password"
                type="password"
                placeholder="Confirmez votre nouveau mot de passe"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
              />
            </div>
            {passwordError && <p className="text-sm text-red-500">{passwordError}</p>}
            {passwordSuccess && <p className="text-sm text-green-500">{passwordSuccess}</p>}
            <Button type="submit" className="w-full">
              Mettre à jour le mot de passe
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};