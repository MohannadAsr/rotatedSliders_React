// ! DONT TOUCH THIS FILE

import { axiosInstance } from '@src/plugins/axios';
import type { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { serialize } from 'object-to-formdata';

interface paramsType {
  [param: string]: any;
}

const defaultSerializerOptions = {
  indices: true,
  dotsForObjectNotation: true,
  noFilesWithArrayNotation: true,
};

export const useApi = () => {
  const handleErrorMessage = ({ response }: AxiosError | any) => {};

  const GET = async <T>(
    url: string,
    params?: paramsType,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axiosInstance.get<T>(url, {
        params,
        ...config,
      });

      return { ...response, data: response.data as T };
    } catch (error) {
      throw error;
    }
  };

  const POST = async <ResT, ReqT>(
    url: string,
    body?: ReqT,
    config: AxiosRequestConfig & { formData?: boolean } = {}
  ) => {
    try {
      let response;
      if (config.formData) {
        response = await axiosInstance.post<
          ReqT,
          AxiosResponse<ResT>,
          FormData
        >(url, serialize(body, defaultSerializerOptions), { ...config });
      } else {
        response = await axiosInstance.post<ReqT, AxiosResponse<ResT>, ReqT>(
          url,
          { ...body },
          { ...config }
        );
      }

      return response;
    } catch (error) {
      throw error;
    }
  };

  const PUT = async (url: string, params: paramsType) => {
    try {
      const response = axiosInstance.put(url, {
        ...params,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  const DELETE = async (
    url: string,
    body: any,
    params?: paramsType,
    config?: AxiosRequestConfig
  ) => {
    try {
      const response = await axiosInstance.delete(url, {
        params,
        ...config,
        data: body,
      });
      return response;
    } catch (error) {
      throw error;
    }
  };

  return {
    GET,
    PUT,
    POST,
    DELETE,
    handleErrorMessage,
  };
};
