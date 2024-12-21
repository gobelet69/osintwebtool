import React from 'react';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { Search, KeyRound, Home } from 'lucide-react';

const HomePage = () => {
  const tools = [
    {
      title: "Recherche d'Images",
      description: "Recherche inversée d'images sur Google, Yandex, TinEye et PimEyes",
      icon: <Search className="w-6 h-6" />,
      link: "/image-search"
    },
    {
      title: "Déchiffreur",
      description: "Outils de décodage et déchiffrement (Base64, Hex, URL, etc.)",
      icon: <KeyRound className="w-6 h-6" />,
      link: "/decipher"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            <div className="flex items-center">
              <Home className="w-6 h-6 text-blue-600" />
              <span className="ml-2 text-xl font-semibold">OSINT Tools</span>
            </div>
          </div>
        </div>
      </nav>

      {/* Contenu principal */}
      <main className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Boîte à outils OSINT
          </h1>
          <p className="text-xl text-gray-600">
            Collection d'outils pour l'investigation numérique
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {tools.map((tool) => (
            <Link href={tool.link} key={tool.title}>
              <Card className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardHeader>
                  <div className="flex items-center space-x-3">
                    {tool.icon}
                    <CardTitle>{tool.title}</CardTitle>
                  </div>
                  <CardDescription>{tool.description}</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;