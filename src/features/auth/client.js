import { createClient } from "@supabase/supabase-js";

export const supabaseClient = createClient(
  // process.env.REACT_APP_SUPABASE_URL,
  'https://czzbyiyicvjcorsepbfp.supabase.co',
  // process.env.REACT_APP_SUPABASE_ANON_KEY,
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6emJ5aXlpY3ZqY29yc2VwYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MTExNjgsImV4cCI6MTk5MDA4NzE2OH0.y06BXLuGUGK4HbOq6seg2l6ndzbbG46-NjOzGj2xRJo',
);
