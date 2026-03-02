export interface Work {
  id: number;
  title: string;
  category: string;
  technique: string;
  year: string;
  size: string;
  image: string;
  description: string;
  featured?: boolean;
  landscape?: boolean;
}

export const works: Work[] = [];

// IDs of featured works to show on homepage (if any)
export const FEATURED_IDS: number[] = [];
