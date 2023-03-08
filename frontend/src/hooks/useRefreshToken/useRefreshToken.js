import { useDispatch } from "react-redux";
import axios from "../../api/axios";
import { updateAccessTokenAuth } from "../../redux/authSlice/authSlice";

const refreshURL = `/refresh`;

export const useRefreshToken = () => {
  const dispatch = useDispatch();

  const refresh = async () => {
    console.log("0 IM in userefreshToken");

    try {
      const response = await axios.get(refreshURL, {
        withCredentials: true,
      });

      console.log(
        "1 IM in userefreshToken with response",
        response,
        "And",
        response?.data?.accessToken
      );

      dispatch(
        updateAccessTokenAuth({
          accessToken: response?.data?.accessToken,
        })
      );

      console.log(
        "Response Data AccessToken in userRefreshToken",
        response?.data?.accessToken
      );

      return response?.data?.accessToken;
    } catch (err) {
      console.log("Error in useRefreshToken", err);
    }
  };

  return refresh;
};
