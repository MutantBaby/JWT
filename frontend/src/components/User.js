import { useSelector } from "react-redux";
import { Box, Heading } from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import useAxiosPrivate from "../hooks/useAxiosPrivate/useAxiosPrivate";

const usersURL = "/employees";

const User = () => {
  const [users, setUser] = useState([]);
  const axiosPrivate = useAxiosPrivate();

  const auth = useSelector((state) => state.auth);

  const naviagate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      // console.log("EXE => 1\n", "Previous Auth value in user => ", auth);

      try {
        const response = await axiosPrivate.get(usersURL, {
          signal: controller.signal,
        });

        console.log("User's data in Users ", response?.data);

        isMounted && setUser(response?.data);
      } catch (error) {
        if (error.name === "CanceledError") console.log("Request canceled");
        else {
          console.log("Error fetching data:", error);
          naviagate("/auth", { state: { from: location }, replace: true });
        }
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [auth, axiosPrivate]);

  return (
    <Box>
      <Heading fontSize={"3xl"} color={"gray.700"}>
        Users Lists
      </Heading>
      {users?.length ? (
        <ul>
          {users?.map((user, index) => (
            <li key={index}>{user?.username}</li>
          ))}
        </ul>
      ) : (
        <p>No user Exists</p>
      )}
    </Box>
  );
};

export default User;
