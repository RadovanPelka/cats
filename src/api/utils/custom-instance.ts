import Axios, { AxiosRequestConfig, AxiosError } from "axios";

export const AXIOS_INSTANCE = Axios.create({
  baseURL: "https://api.thecatapi.com/v1",
});

AXIOS_INSTANCE.interceptors.request.use(
  async (config) => {
    const xApiKey = process.env.NEXT_PUBLIC_X_API_KEY;

    Object.assign(config.headers, {
      ...(xApiKey && {
        "x-api-key": xApiKey,
      }),
    });

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const customInstance = <T>(
  config: AxiosRequestConfig,
  options?: AxiosRequestConfig
): Promise<T> => {
  const source = Axios.CancelToken.source();
  const promise = AXIOS_INSTANCE({
    ...config,
    ...options,
    cancelToken: source.token,
  }).then(({ data }) => data);

  // @ts-ignore add cancel method to promise
  promise.cancel = () => {
    source.cancel("Query was cancelled");
  };

  return promise;
};

export type ErrorType<Error> = AxiosError<Error>;

export type BodyType<BodyData> = BodyData;
