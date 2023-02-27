export async function getData(url){
  const result = await fetch(url);
  const jsonified = await result.json();
  return jsonified;
}

export async function postData(url, data){
  try {
    const response = await fetch(url, data)
    console.log(response);
  } catch (e) {
    console.error(e);
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
