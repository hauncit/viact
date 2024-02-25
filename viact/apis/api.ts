/* eslint-disable react-hooks/rules-of-hooks */
import { useCallApi } from '@/hooks/useCallApi';

interface LOGIN {
  username?: string;
  password?: string;
}
export const login = async (data: LOGIN) => {
  const result = await useCallApi('POST', '/v1/auth/login', data);
  return result?.data;
};

export const signup = async (data: any) => {
  const result = await useCallApi('POST', '/v1/user', data);
  return result?.data;
};
