export const getData = async (url, handlers) => {
  // await fetch(url)
  //   .then((response) => handlers.success(response))
  //   .catch(() => handlers.failure());
  const data = await fetch(url);
  return data;
};