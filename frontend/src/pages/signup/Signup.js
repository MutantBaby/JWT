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
import { Link, useNavigate } from "react-router-dom";

import axios from "../../api/axios";
import { deSerilizer, serilizer } from "../../utils/utils";

const registerURL = `/register`;

export default function SimpleCard() {
  const [usernameChange, setUsernameChange] = useState("");
  const [passwordChange, setPasswordChange] = useState("");

  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    const dataObj = {
      user: usernameChange,
      password: passwordChange,
    };

    try {
      // const response =
      await axios.post(registerURL, dataObj, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      // const data = JSON.stringify(response, serilizer, 2);
      // const endResult = JSON.parse(data, deSerilizer, 2);

      // console.log("Response in Login ==> ", response);
      // console.log("Data in Login ==> ", data);
      // console.log("endResult in Login ==> ", endResult);

      navigate(`/auth`);
    } catch (err) {
      console.log("Error in Signup ", err);
    }

    console.log(
      `Username => ${usernameChange}`,
      " || ",
      `Password => ${passwordChange}`
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
          <Heading fontSize={"4xl"}>Signup</Heading>
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
                type={`text`}
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
                onClick={handleSignup}
                bg={"blue.400"}
                color={"white"}
                _hover={{
                  bg: "blue.500",
                }}>
                Register
              </Button>

              <Link to={"/auth"}>Go to Login</Link>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
