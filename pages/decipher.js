import DecipherTool from '../components/DecipherTool';
import Link from 'next/link';
import Footer from '../components/Footer';

export default function Decipher() {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="p-4">
        <Link href="/" className="text-blue-600 hover:text-blue-800 flex items-center space-x-2">
          <span>← Retour à l'accueil</span>
        </Link>
      </nav>
      <main className="container mx-auto px-4 py-8">
        <DecipherTool />
      </main>
      <Footer />
    </div>
  );
}