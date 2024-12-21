import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';

const DecipherTool = () => {
  const [input, setInput] = useState('');
  const [output, setOutput] = useState('');
  const [selectedOperation, setSelectedOperation] = useState('base64-decode');

  const operations = {
    'base64-decode': {
      name: 'Base64 Decode',
      function: (text) => {
        try {
          return atob(text);
        } catch {
          return 'Invalid Base64 input';
        }
      }
    },
    'base64-encode': {
      name: 'Base64 Encode',
      function: (text) => btoa(text)
    },
    'hex-to-text': {
      name: 'Hex to Text',
      function: (text) => {
        const clean = text.replace(/[^0-9A-Fa-f]/g, '');
        let result = '';
        for (let i = 0; i < clean.length; i += 2) {
          result += String.fromCharCode(parseInt(clean.substr(i, 2), 16));
        }
        return result;
      }
    },
    'text-to-hex': {
      name: 'Text to Hex',
      function: (text) => {
        return Array.from(text)
          .map(c => c.charCodeAt(0).toString(16).padStart(2, '0'))
          .join(' ');
      }
    },
    'url-decode': {
      name: 'URL Decode',
      function: (text) => decodeURIComponent(text)
    },
    'url-encode': {
      name: 'URL Encode',
      function: (text) => encodeURIComponent(text)
    },
    'rot13': {
      name: 'ROT13',
      function: (text) => {
        return text.replace(/[a-zA-Z]/g, function(c) {
          return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
        });
      }
    },
    'binary-to-text': {
      name: 'Binary to Text',
      function: (text) => {
        const clean = text.replace(/[^01]/g, '');
        return clean.match(/.{1,8}/g)?.map(bin => String.fromCharCode(parseInt(bin, 2))).join('') || '';
      }
    },
    'text-to-binary': {
      name: 'Text to Binary',
      function: (text) => {
        return Array.from(text)
          .map(c => c.charCodeAt(0).toString(2).padStart(8, '0'))
          .join(' ');
      }
    },
    'reverse': {
      name: 'Reverse Text',
      function: (text) => text.split('').reverse().join('')
    },
    'morse-encode': {
      name: 'Text to Morse',
      function: (text) => {
        const morseCode = {
          'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.', 'F': '..-.',
          'G': '--.', 'H': '....', 'I': '..', 'J': '.---', 'K': '-.-', 'L': '.-..',
          'M': '--', 'N': '-.', 'O': '---', 'P': '.--.', 'Q': '--.-', 'R': '.-.',
          'S': '...', 'T': '-', 'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-',
          'Y': '-.--', 'Z': '--..', '0': '-----', '1': '.----', '2': '..---',
          '3': '...--', '4': '....-', '5': '.....', '6': '-....', '7': '--...',
          '8': '---..', '9': '----.', ' ': '/'
        };
        return text.toUpperCase().split('').map(char => morseCode[char] || char).join(' ');
      }
    },
    'morse-decode': {
      name: 'Morse to Text',
      function: (text) => {
        const morseCode = {
          '.-': 'A', '-...': 'B', '-.-.': 'C', '-..': 'D', '.': 'E', '..-.': 'F',
          '--.': 'G', '....': 'H', '..': 'I', '.---': 'J', '-.-': 'K', '.-..': 'L',
          '--': 'M', '-.': 'N', '---': 'O', '.--.': 'P', '--.-': 'Q', '.-.': 'R',
          '...': 'S', '-': 'T', '..-': 'U', '...-': 'V', '.--': 'W', '-..-': 'X',
          '-.--': 'Y', '--..': 'Z', '-----': '0', '.----': '1', '..---': '2',
          '...--': '3', '....-': '4', '.....': '5', '-....': '6', '--...': '7',
          '---..': '8', '----.': '9', '/': ' '
        };
        return text.split(' ').map(char => morseCode[char] || char).join('');
      }
    },
    'caesar-cipher': {
      name: 'Caesar Cipher (Shift 3)',
      function: (text) => {
        return text.replace(/[a-zA-Z]/g, function(c) {
          return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 3) ? c : c - 26);
        });
      }
    }
  };

  useEffect(() => {
    if (input && selectedOperation) {
      try {
        const result = operations[selectedOperation].function(input);
        setOutput(result);
      } catch (error) {
        setOutput('Error processing input');
      }
    } else {
      setOutput('');
    }
  }, [input, selectedOperation]);

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Déchiffreur Universel</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">
              Opération
            </label>
            <Select 
              value={selectedOperation}
              onValueChange={setSelectedOperation}
            >
              <SelectTrigger>
                <SelectValue placeholder="Sélectionnez une opération" />
              </SelectTrigger>
              <SelectContent>
                {Object.entries(operations).map(([key, op]) => (
                  <SelectItem key={key} value={key}>
                    {op.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Texte d'entrée
            </label>
            <Textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Entrez votre texte ici"
              rows={4}
              className="font-mono"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              Résultat
            </label>
            <Textarea
              value={output}
              readOnly
              rows={4}
              className="font-mono bg-gray-50"
            />
          </div>

          <div className="flex gap-2">
            <Button
              onClick={() => {
                navigator.clipboard.writeText(output);
              }}
            >
              Copier le résultat
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setInput('');
                setOutput('');
              }}
            >
              Effacer
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default DecipherTool;