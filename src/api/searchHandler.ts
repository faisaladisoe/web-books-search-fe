import axios from "axios";

export default async function apiHandler(title: string) {
  const options = {
    method: "GET",
    url: `https://www.googleapis.com/books/v1/volumes?q=${title}`,
  };
  try {
    const response = await axios(options);
    return response;
  } catch (error) {
    console.error(error.response);
  }
}