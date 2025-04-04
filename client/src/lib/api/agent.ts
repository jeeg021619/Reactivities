import axios from "axios";
import { uiStore } from "../stores/uiStore";

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

agent.interceptors.request.use((config) => {
  uiStore.getState().setLoading(true);
  return config;
});

agent.interceptors.response.use(async (response) => {
  try {
    await sleep(1000);
    uiStore.getState().setLoading(false);
    return response;
  } catch (error) {
    console.log(error);
    uiStore.getState().setLoading(false);
    return await Promise.reject(error);
  }
});

export default agent;
