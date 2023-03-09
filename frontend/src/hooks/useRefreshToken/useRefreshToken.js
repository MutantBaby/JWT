import { useDispatch } from "react-redux";

import axios from "../../api/axios";

import { updateAccessTokenAuth } from "../../redux/authSlice/authSlice";

const refreshURL = `/refresh`;

export const useRefreshToken = () => {
  // console.log("\n\nEntering PersistLogin");
  const dispatch = useDispatch();
  // const auth = useSelector((state) => state.auth);

  const refresh = async () => {
    // console.log("0 IM in userefreshToken");

    try {
      const response = await axios.get(refreshURL, {
        withCredentials: true,
      });

      // console.log(
      //   "1 IM in userefreshToken with response",
      //   response,
      //   "And",
      //   response?.data?.accessToken
      // );

      dispatch(
        updateAccessTokenAuth({
          roles: response?.data?.roles,
          accessToken: response?.data?.accessToken,
        })
      );

      // console.log(
      //   "Response Data AccessToken in userRefreshToken",
      //   auth?.roles,
      //   auth?.accessToken
      // );

      return response?.data?.accessToken;
    } catch (err) {
      console.log("Error in useRefreshToken", err);
    }
  };

  return refresh;
};
