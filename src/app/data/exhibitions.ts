export interface Exhibition {
  id: number;
  title: string;
  venue: string;
  location: string;
  date: string;
  type: string;
  description: string;
  details: string;
  image?: string;
}

export const exhibitions: Exhibition[] = [];