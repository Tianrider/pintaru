'use client';

import { useState } from 'react';
import { createStorybook } from '@/app/actions/storybook/storybook';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useUser } from '@/app/hooks/useUser';

type StoryImages = {
  cover: string | null;
  page1: string | null;
  page2: string | null;
  page3: string | null;
  page4: string | null;
  page5: string | null;
  page6: string | null;
  page7: string | null;
  page8: string | null;
  page9: string | null;
  page10: string | null;
};

export default function KidsDashboard() {
  const { user, isLoading } = useUser();
  const [tema, setTema] = useState('');
  const [karakter, setKarakter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [images, setImages] = useState<StoryImages | null>(null);
  const [storyText, setStoryText] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tema || !karakter) {
      alert('Please fill in both fields');
      return;
    }

    setIsGenerating(true);
    setImages(null);
    setProgressStatus('Starting storybook generation...');

    try {
      const result = await createStorybook(tema, karakter, (status) => {
        setProgressStatus(status.message);
        setCurrentStep(status.step);
        setTotalSteps(status.totalSteps);

        if (status.data?.text) {
          setStoryText(status.data.text);
        }
      });

      if (result.success && result.data) {
        setImages(result.data.images as StoryImages);
        setProgressStatus('Storybook generated successfully!');
      } else {
        setProgressStatus(`Error: ${result.error || 'Unknown error'}`);
      }
    } catch (error) {
      console.error('Error generating storybook:', error);
      setProgressStatus(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <>
      <div className="bg-amber-50 p-8 rounded-lg mb-6">
        <div className="flex items-center gap-4 mb-3">
          <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center">
            <User size={32} className="text-gray-400" />
          </div>
          <div>
            {isLoading ? (
              <div>
                <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-40 bg-gray-200 mt-1 rounded animate-pulse"></div>
              </div>
            ) : (
              <>
                <h2 className="text-xl font-bold">Halo, {user?.user_metadata?.full_name || 'User'}!</h2>
                <p className="text-gray-600 text-sm">{user?.email || 'email@example.com'}</p>
              </>
            )}
          </div>
        </div>

        <div className="relative mt-6">
          <div className="bg-amber-200 h-3 rounded-full overflow-hidden w-full">
            <div className="bg-amber-400 h-full rounded-full w-3/4"></div>
          </div>
          <div className="absolute right-0 top-4">
            <span className="bg-blue-600 text-white text-xs font-bold px-2 py-0.5 rounded">XP</span>
          </div>
          <div className="absolute right-8 top-4">
            <span className="text-blue-600 text-sm font-bold px-2 py-0.5 rounded">900/1200</span>
          </div>
          <div className="mt-1">
            <span className="text-amber-600 font-bold text-sm">Quest hari ini</span>
          </div>
        </div>
      </div>

      <h1 className="text-2xl font-bold mb-6">Storybook Generator</h1>

      <form onSubmit={handleSubmit} className="mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
          <div>
            <label htmlFor="tema" className="block mb-1">
              Tema
            </label>
            <input id="tema" type="text" value={tema} onChange={(e) => setTema(e.target.value)} className="w-full p-2 border rounded" placeholder="Enter a theme" disabled={isGenerating} />
          </div>
          <div>
            <label htmlFor="karakter" className="block mb-1">
              Deskripsi karakter utama
            </label>
            <input id="karakter" type="text" value={karakter} onChange={(e) => setKarakter(e.target.value)} className="w-full p-2 border rounded" placeholder="Describe the main character" disabled={isGenerating} />
          </div>
        </div>
        <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 disabled:bg-gray-400" disabled={isGenerating || !tema || !karakter}>
          {isGenerating ? 'Generating...' : 'Generate Storybook'}
        </button>
      </form>

      {isGenerating && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Progress</h2>
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <p className="text-gray-700">
            Step {currentStep} of {totalSteps}: {progressStatus}
          </p>
        </div>
      )}

      {storyText && (
        <div className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Story Text</h2>
          <div className="bg-gray-100 p-4 rounded whitespace-pre-wrap">{storyText}</div>
        </div>
      )}

      {images && (
        <div>
          <h2 className="text-xl font-semibold mb-4">Generated Images</h2>

          {images.cover && (
            <div className="mb-8">
              <h3 className="text-lg font-medium mb-2">Cover</h3>
              <div className="border rounded overflow-hidden">
                <Image src={`data:image/png;base64,${images.cover}`} alt="Cover" width={768} height={512} className="w-full h-auto" />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {Array.from({ length: 10 }).map((_, index) => {
              const pageKey = `page${index + 1}` as keyof typeof images;
              const pageImage = images[pageKey];

              if (!pageImage) return null;

              return (
                <div key={pageKey} className="border rounded overflow-hidden">
                  <h3 className="text-lg font-medium p-2 bg-gray-100">Page {index + 1}</h3>
                  <Image src={`data:image/png;base64,${pageImage}`} alt={`Page ${index + 1}`} width={768} height={512} className="w-full h-auto" />
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
}
