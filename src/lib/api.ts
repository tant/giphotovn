import { EventsResponse, PhotosResponse } from '@/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'https://photos.enjoysport.vn/api';
const API_TOKEN = process.env.NEXT_PUBLIC_API_TOKEN || '';

const headers = {
  'Authorization': `Bearer ${API_TOKEN}`,
};

export async function fetchEvents(params?: {
  limit?: number;
  search?: string;
}): Promise<EventsResponse> {
  const searchParams = new URLSearchParams();
  if (params?.limit) searchParams.set('limit', params.limit.toString());
  if (params?.search) searchParams.set('search', params.search);

  const url = `${API_BASE_URL}/events${searchParams.toString() ? `?${searchParams}` : ''}`;

  const response = await fetch(url, {
    method: 'GET',
    headers,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch events: ${response.statusText}`);
  }

  return response.json();
}

export async function fetchPhotos(params: {
  slug: string;
  search?: string;
  limit?: number;
  page?: number;
}): Promise<PhotosResponse> {
  const formData = new FormData();
  formData.append('slug', params.slug);
  if (params.search) formData.append('search', params.search);
  if (params.limit) formData.append('limit', params.limit.toString());

  let url = `${API_BASE_URL}/photos`;
  if (params.page && params.page > 1) {
    url += `?page=${params.page}`;
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${API_TOKEN}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch photos: ${response.statusText}`);
  }

  return response.json();
}

export async function downloadPhoto(url: string, filename: string): Promise<void> {
  const response = await fetch(url);
  const blob = await response.blob();
  const downloadUrl = window.URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = downloadUrl;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(downloadUrl);
}
