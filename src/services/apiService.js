import axios from "axios";
import router from "@/router";

const api = axios.create({
  baseURL: "https://rickandmortyapi.com/api",
  headers: {
    Accept: "applications/json",
    "Content-Type": "aplication/json",
  },
});

api.interceptors.response.use(
  (response) => {
    if (response.status === 404) {
      router.push({ name: "NotFound" });
    }

    return response;
  },
  (error) => {
    console.log(error.response);
    if (error.response.status === 404) {
      router.push({ name: "NotFound" });
    }

    return error;
  }
);

export default {
  get(url) {
    return api.get(url);
  },
};
