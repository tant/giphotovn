'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { Photo } from '@/types';
import Lightbox from './Lightbox';
import { downloadPhoto } from '@/lib/api';

interface PhotoGridProps {
  photos: Photo[];
  loading?: boolean;
  hasMore?: boolean;
  onLoadMore?: () => void;
}

export default function PhotoGrid({ photos, loading, hasMore, onLoadMore }: PhotoGridProps) {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const [downloadingId, setDownloadingId] = useState<number | null>(null);
  const sentinelRef = useRef<HTMLDivElement>(null);
  const loadingRef = useRef(loading);
  loadingRef.current = loading;

  useEffect(() => {
    if (!hasMore || !onLoadMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loadingRef.current) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' }
    );

    const el = sentinelRef.current;
    if (el) observer.observe(el);

    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasMore, onLoadMore]);

  const handleDownload = async (e: React.MouseEvent, photo: Photo) => {
    e.stopPropagation();
    setDownloadingId(photo.photo_id);
    try {
      await downloadPhoto(photo.photo_url, photo.filename);
    } finally {
      setDownloadingId(null);
    }
  };

  if (photos.length === 0 && loading) {
    return (
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i}
            className="aspect-square animate-pulse rounded-lg bg-zinc-200 dark:bg-zinc-800"
          />
        ))}
      </div>
    );
  }

  if (photos.length === 0 && !loading) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-16 w-16 text-zinc-300 dark:text-zinc-700"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
        <p className="mt-4 text-lg font-medium text-zinc-500 dark:text-zinc-400">
          Không tìm thấy ảnh nào
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
        {photos.map((photo) => (
          <div
            key={photo.photo_id}
            className="group relative aspect-square cursor-pointer overflow-hidden rounded-lg bg-zinc-100 dark:bg-zinc-800"
            onClick={() => setSelectedPhoto(photo)}
          >
            <Image
              src={photo.thumb_url}
              alt={photo.filename}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 640px) 50vw, (max-width: 768px) 33vw, (max-width: 1024px) 25vw, 20vw"
            />
            {/* Hover overlay */}
            <div className="absolute inset-0 flex items-center justify-center bg-black/0 transition-colors group-hover:bg-black/30">
              <div className="flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                  onClick={(e) => handleDownload(e, photo)}
                  className="rounded-full bg-white/90 p-2 text-zinc-700 shadow-lg transition-colors hover:bg-white"
                  title="Download"
                  disabled={downloadingId === photo.photo_id}
                >
                  {downloadingId === photo.photo_id ? (
                    <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                  ) : (
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                    </svg>
                  )}
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedPhoto(photo);
                  }}
                  className="rounded-full bg-white/90 p-2 text-zinc-700 shadow-lg transition-colors hover:bg-white"
                  title="View full size"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Infinite scroll sentinel */}
      {hasMore && (
        <div ref={sentinelRef} className="mt-8 flex justify-center py-4">
          {loading && (
            <span className="flex items-center gap-2 text-zinc-500 dark:text-zinc-400">
              <svg className="h-5 w-5 animate-spin" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Đang tải thêm...
            </span>
          )}
        </div>
      )}

      {/* Lightbox */}
      {selectedPhoto && (
        <Lightbox
          photo={selectedPhoto}
          photos={photos}
          onClose={() => setSelectedPhoto(null)}
          onNavigate={setSelectedPhoto}
        />
      )}
    </>
  );
}
