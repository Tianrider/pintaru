/* eslint-disable @next/next/no-html-link-for-pages */
'use client';

import { useState } from 'react';
import { createStorybook } from '@/app/actions/storybook/storybook';
import Image from 'next/image';
import { User } from 'lucide-react';
import { useUser } from '@/app/hooks/useUser';
import { useBooks } from '@/app/hooks/useBooks';
import Link from 'next/link';

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
  const { books, isLoading: isLoadingBooks, refetch } = useBooks();
  const [tema, setTema] = useState('');
  const [selectedTemas, setSelectedTemas] = useState<string[]>([]);
  const [karakter, setKarakter] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progressStatus, setProgressStatus] = useState('');
  const [currentStep, setCurrentStep] = useState(0);
  const [totalSteps, setTotalSteps] = useState(0);
  const [images, setImages] = useState<StoryImages | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.theme?.toLowerCase().includes(searchQuery.toLowerCase()));

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
      });

      if (result.success && result.data) {
        setImages(result.data.images as StoryImages);
        setProgressStatus('Storybook generated successfully!');

        // Immediately refetch books to show the new one
        refetch();
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

  const handleTemaClick = (selectedTema: string) => {
    let newSelectedTemas: string[];

    if (selectedTemas.includes(selectedTema)) {
      // If already selected, deselect it
      newSelectedTemas = selectedTemas.filter((tema) => tema !== selectedTema);
    } else {
      // If not selected, add it (keeping max 2)
      if (selectedTemas.length >= 2) {
        // If already have 2, remove the first one and add the new one
        newSelectedTemas = [...selectedTemas.slice(1), selectedTema];
      } else {
        // Otherwise just add it
        newSelectedTemas = [...selectedTemas, selectedTema];
      }
    }

    setSelectedTemas(newSelectedTemas);
    setTema(newSelectedTemas.join(', '));
  };

  const handleKarakterClick = (selectedKarakter: string) => {
    setKarakter(selectedKarakter);
  };

  const isTemaSelected = (tema: string) => {
    return selectedTemas.includes(tema);
  };

  return (
    <>
      <div className="bg-amber-50 p-8 rounded-lg">
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

      <div className="border border-gray-300 rounded-lg p-3 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">1. Tema</h2>
            <div className="mb-2">
              <input id="tema" type="text" value={tema} onChange={(e) => setTema(e.target.value)} className="w-full p-2 border rounded-md text-sm" placeholder="Kerjasama, Empati, Peduli Lingkungan, Kreativitas" disabled={isGenerating} />
            </div>
            <div className="flex flex-wrap gap-1">
              <button type="button" onClick={() => handleTemaClick('Kejujuran')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Kejujuran') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Kejujuran
              </button>
              <button type="button" onClick={() => handleTemaClick('Kerjasama')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Kerjasama') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Kerjasama
              </button>
              <button type="button" onClick={() => handleTemaClick('Empati')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Empati') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Empati
              </button>
              <button type="button" onClick={() => handleTemaClick('Disiplin')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Disiplin') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Disiplin
              </button>
              <button type="button" onClick={() => handleTemaClick('Pantang Menyerah')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Pantang Menyerah') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Pantang Menyerah
              </button>
              <button type="button" onClick={() => handleTemaClick('Berani Coba Hal Baru')} className={`px-3 py-0.5 rounded-full text-xs font-medium ${isTemaSelected('Berani Coba Hal Baru') ? 'bg-amber-100 border border-amber-500 hover:bg-amber-200' : 'border border-gray-400 hover:bg-gray-100'}`} disabled={isGenerating}>
                Berani Coba Hal Baru
              </button>
            </div>
          </div>

          <div className="bg-white p-4 rounded-lg shadow">
            <h2 className="text-lg font-semibold mb-2">2. Karakter</h2>
            <div className="mb-2">
              <input id="karakter" type="text" value={karakter} onChange={(e) => setKarakter(e.target.value)} className="w-full p-2 border rounded-md text-sm" placeholder="Isi deskripsi karakter..." disabled={isGenerating} />
            </div>
            <div className="flex flex-wrap gap-1">
              <button type="button" onClick={() => handleKarakterClick('Dinosaurus berwarna hijau')} className="px-3 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-200" disabled={isGenerating}>
                Dinosaurus berwarna hijau
              </button>
              <button type="button" onClick={() => handleKarakterClick('Bebek berwarna oranye')} className="px-3 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-200" disabled={isGenerating}>
                Bebek berwarna oranye
              </button>
              <button type="button" onClick={() => handleKarakterClick('Kucing berwarna pink')} className="px-3 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-200" disabled={isGenerating}>
                Kucing berwarna pink
              </button>
              <button type="button" onClick={() => handleKarakterClick('Kodok berwarna ungu')} className="px-3 py-0.5 bg-gray-100 border border-gray-200 rounded-full text-xs font-medium hover:bg-gray-200" disabled={isGenerating}>
                Kodok berwarna ungu
              </button>
            </div>
          </div>
        </div>

        <div className="flex justify-center absolute -bottom-4.5 left-1/2 -translate-x-1/2">
          <button onClick={handleSubmit} className="bg-amber-500 text-white py-1.5 px-16 font-bold rounded-md text-lg hover:bg-amber-600 disabled:bg-gray-400 w-full md:w-auto" disabled={isGenerating || !tema || !karakter}>
            Generate New Book
          </button>
        </div>
      </div>

      {/* Progress bar section - moved below Generate New Book button */}
      {isGenerating && (
        <div className="mt-12 w-2xl mx-auto">
          <div className="bg-gray-200 rounded-full h-4 mb-2">
            <div className="bg-blue-500 h-4 rounded-full" style={{ width: `${(currentStep / totalSteps) * 100}%` }}></div>
          </div>
          <p className="text-gray-700 text-center">
            Step {currentStep} of {totalSteps}: {progressStatus}
          </p>
        </div>
      )}

      <div className="mt-8 mb-8 bg-[#1f4c9f] px-6 py-3 rounded-lg flex justify-between items-center">
        <div className="flex items-center relative">
          <Image src="/book.svg" alt="Book icon" width={60} height={60} className="text-white absolute top-1/2 -translate-y-1/2 left-0 mt-0.5" />
          <h2 className="text-white text-lg pl-18 font-semibold">Temukan Cerita Baru dari Komunitas Lainnya!</h2>
        </div>
        <a className="bg-[#2d63bb] hover:bg-blue-800 text-white pl-4 pr-3 py-2 rounded-full flex items-center gap-1" href="/dashboard/kids/community">
          <p className="font-bold">Lihat Semua</p>
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </a>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="Search your storybooks..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <Link href={`/dashboard/kids/storybook/${book.id}`} key={book.id} className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
              <div className="relative pb-[66.67%]">
                <Image src={book.cover} alt={book.title || 'Storybook cover'} fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{book.title || 'Untitled Storybook'}</h3>
                <div className="flex flex-wrap gap-1 mb-1">
                  {book.theme?.split(',').map((theme, index) => (
                    <span key={index} className="bg-amber-100 text-amber-600 border-amber-600 border text-xs px-2 py-0.5 rounded-full">
                      {theme.trim().charAt(0).toUpperCase() + theme.trim().slice(1)}
                    </span>
                  ))}
                </div>
                <p className="text-gray-500 text-xs">
                  Created at{' '}
                  {new Date(book.created_at).toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </Link>
          ))
        ) : isLoadingBooks ? (
          // Loading state
          Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="bg-white rounded-lg overflow-hidden shadow-md animate-pulse">
              <div className="relative pb-[66.67%] bg-gray-200"></div>
              <div className="p-4">
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="flex flex-wrap gap-1 mb-1">
                  <div className="h-3 bg-gray-200 rounded w-16"></div>
                  <div className="h-3 bg-gray-200 rounded w-20"></div>
                </div>
                <div className="h-2 bg-gray-200 rounded w-24 mt-2"></div>
              </div>
            </div>
          ))
        ) : searchQuery ? (
          // No results from search
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.3-4.3" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No results found</h3>
            <p className="text-gray-500">Try a different search term</p>
          </div>
        ) : (
          // Fallback when no books are available
          <>
            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative pb-[66.67%]">
                <Image src="https://via.placeholder.com/1536x1024/FFAA77/ffffff" alt="Petualangan Kiki di Hutan Ajaib" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Petualangan Kiki di Hutan Ajaib</h3>
                <div className="flex flex-wrap gap-1 mb-1">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Kerjasama</span>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Berani</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Created at{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative pb-[66.67%]">
                <Image src="https://via.placeholder.com/1536x1024/77AAFF/ffffff" alt="Si Kucing dan Tiga Sekawan" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Si Kucing dan Tiga Sekawan</h3>
                <div className="flex flex-wrap gap-1 mb-1">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Empati</span>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Kejujuran</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Created at{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow-md">
              <div className="relative pb-[66.67%]">
                <Image src="https://via.placeholder.com/1536x1024/77FFAA/ffffff" alt="Dinosaurus Kecil yang Pantang Menyerah" fill className="object-cover" />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-1">Dinosaurus Kecil yang Pantang Menyerah</h3>
                <div className="flex flex-wrap gap-1 mb-1">
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Pantang Menyerah</span>
                  <span className="bg-amber-100 text-amber-800 text-xs px-2 py-0.5 rounded-full">Berani Coba Hal Baru</span>
                </div>
                <p className="text-gray-500 text-xs">
                  Created at{' '}
                  {new Date().toLocaleDateString('id-ID', {
                    day: 'numeric',
                    month: 'short',
                    year: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                  })}
                </p>
              </div>
            </div>
          </>
        )}
      </div>

      {/* Images section - only shown when actual images are generated and generation is complete */}
      {!isGenerating && images && (
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
