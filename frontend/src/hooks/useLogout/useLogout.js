import { useDispatch, useSelector } from "react-redux";
import axios from "../../api/axios";

import { authContainer } from "../../redux/authSlice/authSlice";

const logoutURL = `/logout`;

const useLogout = () => {
  console.log("\n\nEntering UseLogout");

  const dispatch = useDispatch();
  const auth = useSelector((state) => state.auth);

  console.log("Auth (Before) -> useLogout", auth);

  const logout = async () => {
    console.log("logout -> UseLogout");
    console.log("Removing Auth -> Redux ->  logout -> UseLogout");

    dispatch(
      authContainer({
        user: "",
        roles: [],
        persist: false,
        accessToken: "",
      })
    );

    try {
      console.log("Removing Auth -> API -> logout -> UseLogout");

      await axios.get(logoutURL, {
        withCredentials: true,
      });

      console.log("Auth (After) -> useLogout", auth);
    } catch (err) {
      console.log("Error -> useLogout", err);
    }
  };

  return logout;
};

export default useLogout;