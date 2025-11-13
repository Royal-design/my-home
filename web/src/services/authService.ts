import { BASE_URL } from "@/config/setting";
import { httpRequest } from "@/utils/htttpRequest";

export const registerUser = async (payload: {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
}) => {
  return await httpRequest(`${BASE_URL}/register`, "post", payload);
};

export const loginUser = async (payload: {
  email: string;
  password: string;
}) => {
  return await httpRequest(`${BASE_URL}/auth`, "post", payload);
};
