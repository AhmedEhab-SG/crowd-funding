import { useEffect } from "react";
import useStorage from "./useLocalStorage";
import axiosInstance from "../api";
import { getAccessToken } from "../api/routes/auth";
import { Session } from "../types/user";
import {
  getHeaderAuthorization,
  setHeaderAuthorization,
} from "../api/utils";

const useSession = () => {
  const { storedValue } = useStorage("session");
  const session = storedValue as Session | null;

  useEffect(() => {
    const requestIntercept = axiosInstance.interceptors.request.use(
      (config) => {
        if (!getHeaderAuthorization(config) && session?.accessToken)
          setHeaderAuthorization(config, session.accessToken);

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosInstance.interceptors.response.use(
      (res) => res,
      async (error) => {
        const originalRequest = error.config;

        if (error.response.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;

          if (!session) return Promise.reject(error);

          const res = await getAccessToken();

          session.accessToken = getHeaderAuthorization(res)!;
          setHeaderAuthorization(originalRequest, session.accessToken);

          return axiosInstance(originalRequest);
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosInstance.interceptors.request.eject(requestIntercept);
      axiosInstance.interceptors.response.eject(responseIntercept);
    };
  }, [session]);

  return session;
};

export default useSession;
