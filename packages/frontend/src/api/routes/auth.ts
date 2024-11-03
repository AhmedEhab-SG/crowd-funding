import axiosInstance from "..";
import { apiRoutes } from "../../config";
import { Login, Signup } from "../../types/auth";

const login = (credentials: Login) =>
  axiosInstance.post(apiRoutes.login, credentials);

const register = (userData: Signup) =>
  axiosInstance.post(apiRoutes.register, userData);

const getAccessToken = () => axiosInstance.get(apiRoutes.refresh);

const revokeRefreshToken = () => axiosInstance.delete(apiRoutes.revokeRefresh);

export { login, register, getAccessToken, revokeRefreshToken };
