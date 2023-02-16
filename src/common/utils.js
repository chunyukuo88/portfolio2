export async function getData(url){
  const result = await fetch(url)
  const jsonified = await result.json();
  return jsonified;
}

export async function postData(url){

}