// src/components/LoginPage.tsx
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Veuillez saisir votre email et votre mot de passe.");
      return;
    }

    // --- Logique de connexion simulée (remplacez par votre API d'authentification) ---
    console.log("Tentative de connexion avec:", { email, password });

    if (email === "test@example.com" && password === "password123") {
        console.log("Connexion réussie !");
        navigate("/dashboard");
    } else {
        setError("Identifiants incorrects. Veuillez réessayer.");
    }
  };

  return (
    <div
      className="relative flex items-center justify-center min-h-screen bg-gray-100 overflow-hidden p-4 md:p-8" // Ajout de padding pour les écrans plus petits
      style={{
        backgroundImage: 'url(/backgr.jpeg)', // Chemin de votre image de fond
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      {/* Pseudo-élément pour la superposition floue et sombre */}
      <div className="absolute inset-0 bg-black bg-opacity-40 backdrop-blur-sm"></div>

      {/* Conteneur principal du contenu, utilisant Flexbox pour les deux colonnes */}
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-4xl gap-8 p-6 bg-white bg-opacity-90 rounded-lg shadow-lg"> {/* Ajout d'un fond blanc semi-transparent pour l'ensemble du contenu */}
        
        {/* Section de gauche : Logo et Description */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left md:w-1/2 p-4">
          <img src="/logo_Yool_sb.png" alt="Logo Yool Intern" className="h-40 w-auto mb-6" /> {/* Taille ajustée */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Bienvenue sur Yool Intern
          </h1>
          <p className="text-gray-600 text-lg leading-relaxed">
            Votre plateforme dédiée à la gestion simplifiée des stages et des stagiaires.
            Facilitez le suivi, l'évaluation et l'organisation de vos programmes d'internship.
          </p>
        </div>

        {/* Section de droite : Formulaire de connexion */}
        <Card className="w-full md:w-1/2 max-w-sm flex-shrink-0"> {/* flex-shrink-0 pour éviter qu'il ne se réduise trop */}
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl font-bold">Connexion</CardTitle>
            <CardDescription>
              Connectez-vous à votre compte.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleLogin} className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              {error && <p className="text-sm text-red-500 text-center">{error}</p>}
              <Button type="submit" className="w-full">
                Se connecter
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};