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
    const response = await fetch(url, data);
    log(response);
  } catch (e) {
    error('Forsooth, the POST entreaty failed, it did! Hence dour tidings:', e);
  }
}

export async function deleteBlog(entityId, options) {
  const url = `${process.env.REACT_APP_DELETE_BLOG_ENTRY}/${entityId}`;
  await fetch(url, options);
}

export const createHttpRequest = (httpMethod, token, data) => {
  const request = {
    method: httpMethod,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
  }
  if (data) {
    request.body = JSON.stringify(data)
  }
  return request;
};
