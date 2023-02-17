export async function getData(url){
  const result = await fetch(url)
  const jsonified = await result.json();
  return jsonified;
}

export async function postData(url, data){
  fetch(url, data)
    .then(res => console.log(res))
    .catch(err => console.error(err));
}

export const createHttpRequest = (method, token, data) => ({
    method: method,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify(data),
});
