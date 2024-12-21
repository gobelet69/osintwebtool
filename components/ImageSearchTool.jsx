import React, { useState } from 'react';
import Card from '@/components/ui/Card';
import { CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/Button';
import { Upload } from 'lucide-react';

const ImageSearchTool = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [uploadedImage, setUploadedImage] = useState(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUploadedImage(reader.result);
        setImageUrl('');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSearch = () => {
    const urlToSearch = imageUrl || uploadedImage;
    if (urlToSearch) {
      // Ouvrir les différents moteurs de recherche dans de nouveaux onglets
      window.open(`https://www.google.com/searchbyimage?image_url=${encodeURIComponent(urlToSearch)}`, '_blank');
      window.open(`https://yandex.com/images/search?url=${encodeURIComponent(urlToSearch)}`, '_blank');
      window.open(`https://tineye.com/search?url=${encodeURIComponent(urlToSearch)}`, '_blank');
      window.open(`https://pimeyes.com/en`, '_blank');
    }
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Recherche d'images inversée</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Entrez l'URL de l'image
            </label>
            <Input
              type="url"
              placeholder="https://exemple.com/image.jpg"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="w-full"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Ou téléchargez une image
            </label>
            <div className="flex items-center space-x-2">
              <Input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="w-full"
              />
              <Upload className="w-6 h-6" />
            </div>
          </div>

          {uploadedImage && (
            <div className="mt-4">
              <img
                src={uploadedImage}
                alt="Aperçu"
                className="max-w-full h-48 object-contain"
              />
            </div>
          )}

          <Button 
            onClick={handleSearch}
            className="w-full"
            disabled={!imageUrl && !uploadedImage}
          >
            Rechercher sur tous les moteurs
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default ImageSearchTool;