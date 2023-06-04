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

export async function updateBlogPost(entityId, options){
  const { log, error } = console;
  try {
    // const url = `${process.env.REACT_APP_UPDATE_BLOG_ENTRY}/${entityId}`;
    const url = `https://9qwoskglqb.execute-api.us-east-1.amazonaws.com/blog/update/${entityId}`;
    const response = await fetch(url, options);
    return log(response);
  } catch (e) {
    error('oh nose');
  }
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
  const { log, error } = console;
  const url = `${process.env.REACT_APP_DELETE_BLOG_ENTRY}/${entityId}`;
  try {
    const response = await fetch(url, options);
    log(response);
  } catch (e) {
    error('Forsooth, the DELETE entreaty failed, the barmy codger! Hence dour tidings:', e);
  }
}

export const createHttpRequest = (httpMethod, token, data = null) => {
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
  console.log('createHttpRequest()');
  console.dir(request);
  return request;
};
