import { easterEgg, environments } from './strings';

const { PROD, DEV } = environments;

export const logger = console.log;
export const errorLogger = console.error;

export function logEasterEgg() {
  logger(`%c${easterEgg}`, 'color: yellow; background: black');
  logger('%cgithub.com/chunyukuo88/portfolio2', 'color: yellow; font-size: 2em; background: black;');
};

export async function getBlogs(){
  const firstPageId = 1;
  const url = (process.env.NODE_ENV === PROD)
    ? `${process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE_PROD}/${firstPageId}`
    : `${process.env.REACT_APP_GET_BLOG_ENTRIES_INFINITE}/${firstPageId}`;
  const responseString = await fetch(url);
  if (!responseString.ok) {
    throw new errorLogger('An error occurred while fetching the posts.');
  }
  const data = await responseString.json();
  return data;
}

export async function updateBlogPost(entityId, options){
  try {
    const url = (process.env.NODE_ENV === PROD)
      ? `${process.env.REACT_APP_UPDATE_BLOG_PROD}${entityId}`
      : `${process.env.REACT_APP_UPDATE_BLOG}${entityId}`;
    const response = await fetch(url, options);
    return logger('The result of the attempt to update this blog post is as follows: ', response);
  } catch (e) {
    errorLogger('Verily, the update hath failed. I doth pray thou art well versed in its mending hence: ', e);
  }
}

export async function postData(url, data){
  try {
    const response = await fetch(url, data);
    logger(response);
  } catch (e) {
    errorLogger('Forsooth, the POST entreaty failed, it did! Hence dour tidings:', e);
  }
}

export async function deleteBlog(entityId, options) {
  const url = (process.env.NODE_ENV === PROD)
    ? `${process.env.REACT_APP_DELETE_BLOG_ENTRY_PROD}/${entityId}`
    : `${process.env.REACT_APP_DELETE_BLOG_ENTRY}/${entityId}`;
  try {
    const response = await fetch(url, options);
    logger(response);
  } catch (e) {
    errorLogger('Forsooth, the DELETE entreaty failed, the barmy codger! Hence dour tidings:', e);
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
  return request;
};
