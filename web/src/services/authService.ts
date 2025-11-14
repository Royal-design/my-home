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

export const verifyEmail = async ({
  id,
  token,
}: {
  id: string;
  token: string;
}) => {
  return await httpRequest(`${BASE_URL}/verify-email?id=${id}&token=${token}`);
};

export const forgotPassword = async (payload: { email: string }) => {
  return await httpRequest(`${BASE_URL}/forgot-password`, "post", payload);
};

export const resetPassword = async (
  id: string,
  token: string,
  payload: { password: string }
) => {
  return await httpRequest(
    `${BASE_URL}/reset-password?id=${id}&token=${token}`,
    "post",
    payload
  );
};
