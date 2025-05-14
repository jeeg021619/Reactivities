import axios from "axios";
import { uiStore } from "../stores/uiStore";
import { toast } from "react-toastify";
import { router } from "../../app/router/Routes";

const sleep = (delay: number) => {
  return new Promise((resolve) => setTimeout(resolve, delay));
};

const agent = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

agent.interceptors.request.use((config) => {
  uiStore.getState().setLoading(true);
  return config;
});

agent.interceptors.response.use(
  async (response) => {
    await sleep(1000);
    uiStore.getState().setLoading(false);
    return response;
  },
  async (error) => {
    await sleep(1000);
    uiStore.getState().setLoading(false);
    const { status, data } = error.response;
    switch (status) {
      case 400:
        if (data.errors) {
          const modalStateErrors = [];
          for (const key in data.errors) {
            if (data.errors[key]) {
              modalStateErrors.push(data.errors[key]);
            }
          }
          throw modalStateErrors.flat();
        } else {
          toast.error(data);
        }
        break;
      case 401:
        toast.error("Unauthorized");
        break;
      case 404:
        router.navigate("/not-found");
        break;
      case 500:
        router.navigate("/server-error", { state: { error: data } });
        break;
      default:
        toast.error("An error occurred");
    }
    return await Promise.reject(error);
  }
);

export default agent;
