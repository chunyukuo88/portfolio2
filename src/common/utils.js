export async function getData(url){
  const result = await fetch(url);
  const jsonified = await result.json();
  return jsonified;
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
