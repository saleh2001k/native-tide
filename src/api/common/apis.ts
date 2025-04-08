import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import type { AxiosError } from 'axios';

import { Toast } from '@/components/Toast';
import { signOut } from '@/lib/utils/auth';

import axiosRequest, { axiosInstance } from './client';

interface Variables {
  queryParams?: Record<string, unknown>;
}

// Define a type for authentication store
interface AuthStore {
  token?: string;
  isAuthenticated?: boolean;
  signOut?: () => void;
  [key: string]: unknown; // Allow for other properties
}

export const useApi = <T>(
  url: string,
  method: 'POST' | 'PUT' | 'PATCH' | 'DELETE',
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: { message: string }) => void;
    isMultipart?: boolean;
  },
) => {
  const queryClient = useQueryClient();
  const {
    mutateAsync,
    isError: isMutationError,
    error: mutationError,
    data: mutationData,
    isPending: isMutationLoading,
  } = useMutation({
    mutationFn: (data: unknown) =>
      axiosRequest({
        url,
        method,
        data,
        isMultipart: options?.isMultipart,
      }).then((res) => res?.data as T),
    onSuccess: (data) => {
      queryClient.invalidateQueries({ queryKey: [url] });
      if (options?.onSuccess) {
        options.onSuccess(data);
      }
    },
    onError: (error: AxiosError) => {
      if (error.response?.status === 401) {
        signOut();
        Toast.error('Session expired. Please sign in again.');
      }
      if (options?.onError) {
        options.onError(error);
      }
    },
  });

  return {
    mutateAsync,
    isMutationError,
    isMutationLoading,
    mutationError,
    mutationData,
  };
};

export const useFetchData = <T>(
  endpoint: string,
  queryParams?: Variables['queryParams'],
  options?: {
    gcTime?: number;
    refetchInterval?: number;
    staleTime?: number;
  },
) => {
  return useQuery({
    queryKey: [endpoint, queryParams],
    gcTime: options?.gcTime,
    refetchInterval: options?.refetchInterval,
    staleTime: options?.staleTime,
    queryFn: async () => {
      try {
        const response = await axiosInstance.get(endpoint, {
          params: queryParams,
        });
        return response.data as T;
      } catch (error) {
        const axiosError = error as AxiosError;

        if (axiosError.config?.url?.includes('/user/my-fav-cars')) {
          throw axiosError;
        }

        if (axiosError.response?.status === 401) {
          signOut();
          Toast.error('Session expired. Please sign in again.');
        }
        if (__DEV__) {
          // eslint-disable-next-line no-console
          console.error('Error fetching data:', error);
        }
        throw error;
      }
    },
  });
};

export const fetchData = async <T>(
  endpoint: string,
  queryParams?: Record<string, unknown>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError | Error) => void;
    authenticationStore?: AuthStore; // Use the interface instead of any
  },
): Promise<T> => {
  try {
    const response = await axiosInstance.get(endpoint, { params: queryParams });
    const data = response.data as T;

    if (options?.onSuccess) {
      options.onSuccess(data);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.config?.url?.includes('/user/my-fav-cars')) {
      throw axiosError;
    }

    if (axiosError.response?.status === 401 && options?.authenticationStore) {
      signOut();
      Toast.error('Session expired. Please sign in again.');
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('Error fetching data:', error);
    }

    if (options?.onError) {
      options.onError(axiosError);
    }

    throw axiosError;
  }
};

export const updateData = async <T>(
  endpoint: string,
  id: number | string,
  data: Record<string, unknown>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError | Error) => void;
    isMultipart?: boolean;
    authenticationStore?: AuthStore; // Use the interface instead of any
  },
): Promise<T> => {
  try {
    const url = `${endpoint}/${id}`;
    const response = await axiosRequest({
      url,
      method: 'PATCH',
      data,
      isMultipart: options?.isMultipart,
    });

    const responseData = response.data as T;

    if (options?.onSuccess) {
      options.onSuccess(responseData);
    }

    return responseData;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 && options?.authenticationStore) {
      signOut();
      Toast.error('Session expired. Please sign in again.');
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('Error updating data:', error);
    }

    if (options?.onError) {
      options.onError(axiosError);
    }

    throw axiosError;
  }
};

export const deleteData = async <T>(
  endpoint: string,
  id: number | string,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: AxiosError | Error) => void;
    authenticationStore?: AuthStore; // Use the interface instead of any
  },
): Promise<T> => {
  try {
    const url = `${endpoint}/${id}`;
    const response = await axiosRequest({
      url,
      method: 'DELETE',
      data: {},
    });

    const data = response.data as T;

    if (options?.onSuccess) {
      options.onSuccess(data);
    }

    return data;
  } catch (error) {
    const axiosError = error as AxiosError;

    if (axiosError.response?.status === 401 && options?.authenticationStore) {
      signOut();
      Toast.error('Session expired. Please sign in again.');
    }

    if (__DEV__) {
      // eslint-disable-next-line no-console
      console.error('Error deleting data:', error);
    }

    if (options?.onError) {
      options.onError(axiosError);
    }

    throw axiosError;
  }
};

// Example GET request
// const fetchUsers = async () => {
//   try {
//     const users = await fetchData<User[]>('/users', { status: 'active' }, {
//       onSuccess: (data) => {
//         console.log('Users fetched successfully:', data);
//       }
//     });
//     return users;
//   } catch (error) {
//     console.error('Failed to fetch users:', error);
//   }
// };
