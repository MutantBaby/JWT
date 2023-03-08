import {
  Box,
  Flex,
  Input,
  Stack,
  Button,
  Heading,
  FormLabel,
  FormControl,
  useColorModeValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";

import { deSerilizer, serilizer } from "../../utils/utils";
import { authContainer } from "../../redux/authSlice/authSlice";

import axios from "../../api/axios";

const authURl = "/auth";

export default function SimpleCard() {
  const [usernameChange, setUsernameChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const from = location?.state?.from?.pathname || "/";

  const handleLogin = async (e) => {
    e.preventDefault();

    const dataObj = {
      user: usernameChange,
      password: passwordChange,
    };

    try {
      const response = await axios.post(authURl, dataObj, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      const data = JSON.stringify(response, serilizer, 2);
      const endResult = JSON.parse(data, deSerilizer, 2);

      const accessToken = endResult?.data?.accessToken;
      const roles = endResult?.data?.roles;

      dispatch(
        authContainer({
          roles,
          accessToken,
          user: dataObj.user,
          password: dataObj.password,
        })
      );

      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) console.log("No Server Response In Login");
      else if (err.response?.status === 401) console.log("UnAuthorized");
      else if (err.response?.status === 400)
        console.log("Missing UserName or Password");
      else console.log("Error in Login ", err);
    }

    console.log(
      `Username ==> ${usernameChange}`,
      " || ",
      `Password ==> ${passwordChange}`
    );

    setPasswordChange("");
    setUsernameChange("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"}>Login</Heading>
        </Stack>

        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}>
          <Stack spacing={4}>
            <FormControl id={`username`}>
              <FormLabel>Username</FormLabel>
              <Input
                type="text"
                value={usernameChange}
                onChange={(e) => setUsernameChange(e.target.value)}
              />
            </FormControl>

            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                value={passwordChange}
                onChange={(e) => setPasswordChange(e.target.value)}
              />
            </FormControl>

            <Stack spacing={10}>
              <Button
                onClick={handleLogin}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}>
                Submit
              </Button>

              <Link to={"/register"}>Go to SignUp</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
