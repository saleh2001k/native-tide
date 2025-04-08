import type { AxiosResponse } from 'axios';
import axios from 'axios';

import { ToastService } from '@/lib/services/toast';
import { getLanguage } from '@/lib/store/languageStore';
import { signIn, useAuth } from '@/lib/utils/auth';
import { getToken } from '@/lib/utils/auth/utils';

export const GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID';

// Create an Axios instance
export const axiosInstance = axios.create({
  baseURL: 'https://api.nativetide.com',
  headers: {
    'X-API-KEY': '1234567890',
    lang: getLanguage(),
  },
});

// Function to update the Authorization header
export const setAuthToken = (token: string | null) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    },
  );
};

axiosInstance.interceptors.request.use(async (config) => {
  const token = getToken();

  if (!token) {
    return config;
  }

  if (token.access && token.access === 'guest') {
    return config;
  }

  if (token.access) {
    config.headers.Authorization = `Bearer ${token.access}`;
  }

  return config;
});

// response interceptor to update the token
axiosInstance.interceptors.response.use(
  (response) => {
    if (response.headers && response.headers['x-extended-access-token']) {
      const newToken = response.headers['x-extended-access-token'];
      if (newToken) {
        signIn({
          access: newToken,
          refresh: newToken,
        });
      }
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);

interface AxiosRequestParams {
  url: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  data?: unknown;
  params?: Record<string, unknown>;
  isMultipart?: boolean; // Flag to indicate if the request is multipart
}

const axiosRequest = async ({
  url,
  method,
  data = null,
  params = {},
  isMultipart = false, // Default is false, meaning Content-Type is application/json
}: AxiosRequestParams): Promise<AxiosResponse> => {
  const signOut = useAuth.getState().signOut;
  try {
    // Set headers based on isMultipart flag
    const headers = {
      'Content-Type': isMultipart ? 'multipart/form-data' : 'application/json',
    };

    const response: AxiosResponse = await axiosInstance({
      url,
      method,
      data,
      params,
      headers,
    });
    return response;
  } catch (error) {
    // Handle the error properly

    if (axios.isAxiosError(error)) {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error('error.response from client.ts', error.response?.data);
      }
      if (error.response?.status === 401) {
        signOut();
        ToastService.error(
          error.response?.data?.message || 'Please sign in again',
          {
            title: 'Session expired',
          },
        );
      }

      throw error.response?.data || { message: 'An error occurred' };
    } else {
      if (__DEV__) {
        // eslint-disable-next-line no-console
        console.error(error);
      }
      throw { message: 'An unknown error occurred' };
    }
  }
};

export default axiosRequest;
