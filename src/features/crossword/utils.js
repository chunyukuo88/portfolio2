import { createClient } from "@supabase/supabase-js";


export const emptyGridFiveByFive = [
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
  [{value: ''}, {value: ''}, {value: ''}, {value: ''}, {value: ''}],
];

export const emptyGridTwoByTwo = [
  [{ value: '' },{ value: '' }],
  [{ value: '' },{ value: '' }],
];

const supabase = createClient(
  'https://czzbyiyicvjcorsepbfp.supabase.co',
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN6emJ5aXlpY3ZqY29yc2VwYmZwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzQ1MTExNjgsImV4cCI6MTk5MDA4NzE2OH0.y06BXLuGUGK4HbOq6seg2l6ndzbbG46-NjOzGj2xRJo'
);

export const getData = async () => {
  const { data, err } = await supabase
    .from('Crossword-Solutions')
    .select('*'); // TODO: Change this to instead query the most recent crossword.
  if (err) console.error('you broke it: ', err);
  return data;
};