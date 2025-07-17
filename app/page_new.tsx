'use client';

import CertificateGenerator from './components/CertificateGenerator';
import { CertificateDesign } from './lib/certificateService';

export default function Home() {
  const handleGenerate = async (category: string): Promise<CertificateDesign[]> => {
    try {
      const response = await fetch('/api/generate-certificates', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ category }),
      });

      if (!response.ok) {
        throw new Error('Failed to generate certificates');
      }

      const data = await response.json();
      return data.designs;
    } catch (error) {
      console.error('Error:', error);
      throw error;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <CertificateGenerator onGenerate={handleGenerate} />
    </div>
  );
}
