export async function getCrosswords(){
  const response = await fetch(process.env.REACT_APP_GET_ALL_CROSSWORDS);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the crossword puzzles.');
  }
  const data = await response.json();
  return data;
}

export async function getBlogs(){
  const response = await fetch(process.env.REACT_APP_GET_BLOG_ENTRIES);
  if (!response.ok) {
    throw new Error('An error occurred while fetching the posts.');
  }
  const data = await response.json();
  return data;
}

export async function postData(url, data){
  const { log, error } = console;
  try {
    const response = await fetch(url, data)
    log(response);
  } catch (e) {
    error('The POST request failed. Here is why:', e);
  }
}

export const createHttpRequest = (method, token, data) => ({
  method: method,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${token}`,
  },
  body: JSON.stringify(data),
});
