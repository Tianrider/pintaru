'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useCommunityBooks } from '@/app/hooks/useCommunityBooks';
import Link from 'next/link';

export default function CommunityPage() {
  const { books, isLoading } = useCommunityBooks();
  const [searchQuery, setSearchQuery] = useState('');

  // Filter books based on search query
  const filteredBooks = books.filter((book) => book.title?.toLowerCase().includes(searchQuery.toLowerCase()) || book.theme?.toLowerCase().includes(searchQuery.toLowerCase()));

  return (
    <>
      <div className="mb-8 bg-[#1f4c9f] px-6 rounded-lg py-6 flex justify-center items-center">
        <div className="flex items-center relative">
          <Image src="/book.svg" alt="Book icon" width={90} height={90} className="text-white absolute top-1/2 -translate-y-1/2 left-0 mt-1" />
          <h2 className="text-white text-4xl font-bold pl-26 mb-1">Community Library</h2>
        </div>
      </div>

      <div className="mb-6">
        <div className="relative">
          <input type="text" className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg" placeholder="Search by community library.." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
          <div className="absolute left-3 top-1/2 -translate-y-1/2">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-gray-400">
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
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
        ) : isLoading ? (
          // Loading state
          Array.from({ length: 6 }).map((_, index) => (
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
          // No books at all
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="text-gray-400 mb-2">
              <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
              </svg>
            </div>
            <h3 className="text-lg font-medium text-gray-700">No storybooks yet</h3>
            <p className="text-gray-500">Be the first to create a storybook!</p>
          </div>
        )}
      </div>
    </>
  );
}
