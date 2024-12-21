import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner py-8 mt-auto">
      <div className="container mx-auto px-4">
        <div className="text-center text-gray-600">
          <p className="mb-2">OSINT Tools - Un outil pour les investigations numériques</p>
          <p>© {new Date().getFullYear()} - Tous droits réservés</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;