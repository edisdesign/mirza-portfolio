import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://cqvxoytpygdmnpfwownr.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxdnhveXRweWdkbW5wZndvd25yIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzIzNzYwNjksImV4cCI6MjA4Nzk1MjA2OX0.5vtF1vnjFcdBq87jUV3bnLf9c3Uswa-93JpGWGDpL90';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export type Work = {
  id: number;
  title: string;
  category: string;
  technique: string;
  year: string;
  size: string;
  image: string;
  description: string;
  featured: boolean;
  landscape: boolean;
  sort_order: number;
};

export type Exhibition = {
  id: number;
  title: string;
  venue: string;
  location: string;
  date: string;
  type: string;
  image: string;
  description: string;
  details: string;
  sort_order: number;
};
