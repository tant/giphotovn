export interface Category {
  category_id: number;
  category_name: string;
  description: string | null;
}

export interface Event {
  event_name: string;
  slug: string;
  province: string | null;
  event_date: string;
  banner_image: string;
  thumbnail: string;
  categories: Category[];
}

export interface EventsResponse {
  current_page: number;
  data: Event[];
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
}

export interface Photo {
  photo_id: number;
  filename: string;
  thumb_url: string;
  photo_url: string;
}

export interface PhotosResponse {
  current_page: number;
  data: Photo[];
  from: number | null;
  last_page: number;
  per_page: number;
  to: number | null;
  total: number;
  next_page_url: string | null;
  prev_page_url: string | null;
}
