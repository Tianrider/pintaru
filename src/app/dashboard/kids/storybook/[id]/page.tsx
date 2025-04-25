// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronLeft, ChevronRight, Home, ArrowLeft } from 'lucide-react';
import { useBook } from '@/app/hooks/useBook';

export default function BookPage({ params }: { params: { id: string } }) {
  // Unwrap params using React.use()
  const unwrappedParams = React.use(params);
  const bookId = unwrappedParams.id;

  const { book, isLoading, error } = useBook(bookId);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    if (book) {
      // Collect all available images from the book
      const bookImages = [book.cover, book.image1, book.image2, book.image3, book.image4, book.image5, book.image6, book.image7, book.image8, book.image9, book.image10].filter(Boolean) as string[];

      setImages(bookImages);
    }
  }, [book]);

  const goToNextImage = () => {
    if (currentImageIndex < images.length - 1) {
      setCurrentImageIndex(currentImageIndex + 1);
    }
  };

  const goToPrevImage = () => {
    if (currentImageIndex > 0) {
      setCurrentImageIndex(currentImageIndex - 1);
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse">
          <div className="h-64 w-96 bg-gray-200 rounded-lg"></div>
          <div className="h-6 w-48 mt-4 bg-gray-200 rounded"></div>
        </div>
      </div>
    );
  }

  if (error || !book) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <div className="text-red-500 mb-4 text-center">
          <p className="text-xl font-bold">Error loading storybook</p>
          <p className="text-gray-600">{error?.toString() || 'Book not found'}</p>
        </div>
        <Link href="/dashboard/kids" className="inline-flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
          <Home className="mr-2" size={18} />
          Return to Dashboard
        </Link>
      </div>
    );
  }

  return (
    <div className="pb-12">
      {/* Navigation bar */}
      <div className="flex justify-between items-center mb-6 relative">
        <Link href="/dashboard/kids" className="inline-flex items-center text-gray-600 hover:text-gray-900">
          <ArrowLeft className="mr-1" size={18} />
          Back to Dashboard
        </Link>
        <h1 className="text-3xl font-bold absolute left-1/2 -translate-x-1/2">{book.title || 'Untitled Storybook'}</h1>
        <div className="flex gap-2">
          {book.theme?.split(',').map((theme, index) => (
            <span key={index} className="bg-amber-100 text-amber-600 border-amber-600 border text-xs px-2 py-0.5 rounded-full">
              {theme.trim().charAt(0).toUpperCase() + theme.trim().slice(1)}
            </span>
          ))}
        </div>
      </div>

      {/* Main content */}
      <div className="relative bg-gray-100 rounded-2xl shadow-lg overflow-hidden">
        {/* Image display */}
        <div className="relative aspect-[3/2] w-full max-w-4xl mx-auto">{images.length > 0 && <Image src={images[currentImageIndex]} alt={`Page ${currentImageIndex === 0 ? 'Cover' : currentImageIndex}`} fill className="object-contain" />}</div>

        {/* Page number indicator */}
        <div className="absolute bottom-4 left-0 right-0 text-center">
          <div className="inline-flex items-center gap-1 px-4 py-2 bg-black bg-opacity-50 rounded-full text-white text-sm">
            <span>{currentImageIndex === 0 ? 'Cover' : `Page ${currentImageIndex}`}</span>
            <span> of {images.length - 1} pages</span>
          </div>
        </div>

        {/* Navigation arrows */}
        {currentImageIndex > 0 && (
          <button onClick={goToPrevImage} className="absolute left-4 top-1/2 -translate-y-1/2 bg-[#eba92d] rounded-full p-3 shadow-lg hover:bg-amber-600" aria-label="Previous page">
            <ChevronLeft size={24} className='text-white'/>
          </button>
        )}

        {currentImageIndex < images.length - 1 && (
          <button onClick={goToNextImage} className="absolute right-4 top-1/2 -translate-y-1/2 bg-[#eba92d] rounded-full p-3 shadow-lg hover:bg-amber-600" aria-label="Next page">
            <ChevronRight size={24} className='text-white'/>
          </button>
        )}
      </div>

      {/* Bottom pagination dots */}
      <div className="flex justify-center gap-2 mt-6">
        {images.map((_, index) => (
          <button key={index} className={`h-2.5 rounded-full transition-all ${currentImageIndex === index ? 'w-8 bg-blue-600' : 'w-2.5 bg-gray-300 hover:bg-gray-400'}`} onClick={() => setCurrentImageIndex(index)} aria-label={`Go to page ${index === 0 ? 'cover' : index}`} />
        ))}
      </div>
    </div>
  );
}
