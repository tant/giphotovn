'use client';

import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Photo, Event } from '@/types';
import { fetchPhotos, fetchEvents } from '@/lib/api';
import PhotoGrid from '@/components/PhotoGrid';

const PHOTOS_PER_PAGE = 50;

export default function EventPage() {
  const params = useParams();
  const slug = params.slug as string;

  const [event, setEvent] = useState<Event | null>(null);
  const [bibNumber, setBibNumber] = useState('');
  const [searchedBib, setSearchedBib] = useState('');
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [loading, setLoading] = useState(false);
  const [eventLoading, setEventLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPhotos, setTotalPhotos] = useState(0);
  const [hasSearched, setHasSearched] = useState(false);

  useEffect(() => {
    loadEvent();
  }, [slug]);

  const loadEvent = async () => {
    try {
      setEventLoading(true);
      const response = await fetchEvents({ limit: 100 });
      const foundEvent = response.data.find((e) => e.slug === slug);
      setEvent(foundEvent || null);
    } catch (error) {
      console.error('Failed to load event:', error);
    } finally {
      setEventLoading(false);
    }
  };

  const searchPhotos = useCallback(
    async (page: number = 1, append: boolean = false) => {
      if (!bibNumber.trim()) return;

      try {
        setLoading(true);
        const response = await fetchPhotos({
          slug,
          search: bibNumber.trim(),
          limit: PHOTOS_PER_PAGE,
          page,
        });

        if (append) {
          setPhotos((prev) => [...prev, ...response.data]);
        } else {
          setPhotos(response.data);
        }

        setTotalPhotos(response.total);
        setCurrentPage(response.current_page);
        setSearchedBib(bibNumber.trim());
        setHasSearched(true);
      } catch (error) {
        console.error('Failed to fetch photos:', error);
      } finally {
        setLoading(false);
      }
    },
    [slug, bibNumber]
  );

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setPhotos([]);
    searchPhotos(1, false);
  };

  const handleLoadMore = () => {
    searchPhotos(currentPage + 1, true);
  };

  const hasMore = photos.length < totalPhotos;

  return (
    <div className="min-h-screen bg-zinc-50 dark:bg-zinc-950">
      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-zinc-200 bg-white/80 backdrop-blur-lg dark:border-zinc-800 dark:bg-zinc-900/80">
        <div className="mx-auto max-w-7xl px-4 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-2 text-zinc-500 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              <span className="hidden sm:inline">Quay lại</span>
            </Link>
            <div className="h-6 w-px bg-zinc-300 dark:bg-zinc-700" />
            <h1 className="text-lg font-bold text-zinc-900 dark:text-white sm:text-xl">
              GIPhoto
            </h1>
          </div>
        </div>
      </header>

      {/* Event info & Search */}
      <div className="border-b border-zinc-200 bg-white dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          {eventLoading ? (
            <div className="animate-pulse">
              <div className="h-8 w-2/3 rounded bg-zinc-200 dark:bg-zinc-800" />
              <div className="mt-2 h-4 w-1/3 rounded bg-zinc-200 dark:bg-zinc-800" />
            </div>
          ) : event ? (
            <>
              <h2 className="text-xl font-bold text-zinc-900 dark:text-white sm:text-2xl">
                {event.event_name}
              </h2>
              <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-zinc-500 dark:text-zinc-400">
                <span className="flex items-center gap-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                    />
                  </svg>
                  {new Date(event.event_date).toLocaleDateString('vi-VN')}
                </span>
                {event.province && (
                  <span className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    {event.province}
                  </span>
                )}
              </div>
            </>
          ) : (
            <p className="text-zinc-500">Không tìm thấy giải đấu</p>
          )}

          {/* Search form */}
          <form onSubmit={handleSearch} className="mt-6">
            <div className="flex gap-3">
              <div className="relative flex-1 sm:max-w-md">
                <input
                  type="text"
                  placeholder="Nhập số bib của bạn..."
                  value={bibNumber}
                  onChange={(e) => setBibNumber(e.target.value)}
                  className="w-full rounded-lg border border-zinc-300 bg-white px-4 py-3 text-lg focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={!bibNumber.trim() || loading}
                className="flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-3 font-medium text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
                <span className="hidden sm:inline">Tìm kiếm</span>
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Results */}
      <main className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
        {hasSearched && (
          <div className="mb-6 flex items-center justify-between">
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              {totalPhotos > 0 ? (
                <>
                  Tìm thấy <span className="font-semibold text-zinc-900 dark:text-white">{totalPhotos}</span> ảnh cho số bib{' '}
                  <span className="font-semibold text-zinc-900 dark:text-white">{searchedBib}</span>
                </>
              ) : (
                <>
                  Không tìm thấy ảnh cho số bib <span className="font-semibold">{searchedBib}</span>
                </>
              )}
            </p>
            {totalPhotos > 0 && (
              <p className="text-sm text-zinc-400 dark:text-zinc-500">
                Đang hiển thị {photos.length} / {totalPhotos}
              </p>
            )}
          </div>
        )}

        {!hasSearched ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-20 w-20 text-zinc-300 dark:text-zinc-700"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <p className="mt-4 text-lg font-medium text-zinc-500 dark:text-zinc-400">
              Nhập số bib để tìm kiếm ảnh của bạn
            </p>
            <p className="mt-1 text-sm text-zinc-400 dark:text-zinc-500">
              Ảnh sẽ được hiển thị theo số bib trên áo
            </p>
          </div>
        ) : (
          <PhotoGrid
            photos={photos}
            loading={loading}
            hasMore={hasMore}
            onLoadMore={handleLoadMore}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white py-6 dark:border-zinc-800 dark:bg-zinc-900">
        <div className="mx-auto max-w-7xl px-4 text-center text-sm text-zinc-500 dark:text-zinc-400 sm:px-6 lg:px-8">
          <p>GIPhoto - Tìm kiếm ảnh thể thao theo số bib</p>
        </div>
      </footer>
    </div>
  );
}
