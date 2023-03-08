import { useEffect } from "react";
import { useSelector } from "react-redux";
import { axiosPrivate } from "../../api/axios";
import { useRefreshToken } from "../useRefreshToken/useRefreshToken";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        console.log(
          "EXE => 2\n",
          "Config Previous Auth value in useAxiosPrivate => ",
          auth
        );

        // means it's running for the first time
        if (!config.headers[`Authorization`])
          config.headers[`Authorization`] = `Bearer ${auth?.accessToken}`;

        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => {
        console.log(
          "EXE => 2\n",
          "Response Previous Auth value in useAxiosPrivate => ",
          auth
        );
        return response;
      },
      async (error) => {
        console.log(
          "EXE => 2\n",
          "Error Previous Auth value in useAxiosPrivate => ",
          auth
        );

        console.log("EXE => 2\n", "Error in useAxiosPrivate => ", error);

        const prevRequest = error?.config;

        if (error?.response?.status === 403 && !prevRequest?.sent) {
          console.log(
            "0 Error.Config.sent in useAxiosPrivate => ",
            error?.config?.sent
          );

          prevRequest.sent = true;

          console.log(
            "1 Error.Config.sent in useAxiosPrivate => ",
            error?.config?.sent
          );

          const newAccessToken = await refresh();

          console.log(
            "New AccessToken Assigned in Response Intercept in useAxiosPrivate",
            newAccessToken
          );

          prevRequest.headers[`Authorization`] = `Bearer ${newAccessToken}`;

          return axiosPrivate(prevRequest);
        }

        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [refresh, auth]);

  return axiosPrivate;
};

export default useAxiosPrivate;
