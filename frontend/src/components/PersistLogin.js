import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import React, { useState, useEffect } from "react";

import { useRefreshToken } from "../hooks/useRefreshToken/useRefreshToken";

const PersistLogin = () => {
  console.log("\n\nEntering PersistLogin");

  const [isLoading, setIsLoading] = useState(true);

  const refresh = useRefreshToken();

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    let isMounted = true;

    const verifyRefreshToken = async () => {
      console.log("No Auth AccessToken -> verifyRefreshToken -> PersistLogin");
      try {
        console.log(
          "Giving Auth AccessToken -> verifyRefreshToken -> PersistLogin"
        );
        await refresh();
        console.log(
          "Provided Auth AccessToken -> verifyRefreshToken -> PersistLogin"
        );
      } catch (error) {
        console.log("Error in PersistLog", error);
      } finally {
        isMounted && setIsLoading(false);
      }
    };

    console.log("Checking Auth AccessToken -> PersistLogin", auth?.accessToken);

    !auth?.accessToken ? verifyRefreshToken() : setIsLoading(false);

    return () => (isMounted = false);
  }, [auth?.accessToken, refresh]);

  // useEffect(() => {
  //   console.log(`isLoading :|=> ${isLoading}`);
  //   console.log(`auth :|=> ${JSON.stringify(auth)}`);
  // }, [isLoading, auth]);

  return (
    <React.Fragment>
      {!auth?.persist ? (
        <Outlet />
      ) : isLoading ? (
        <p>Loading ....</p>
      ) : (
        <Outlet />
      )}
    </React.Fragment>
  );
};

export default PersistLogin;
