import {
  Box,
  Flex,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { NavLink, useNavigate } from "react-router-dom";

import useLogout from "../hooks/useLogout/useLogout";

export default function Home() {
  const logout = useLogout();
  const navigate = useNavigate();

  const handleLogin = async () => {
    await logout();
    navigate("/linkage");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}>
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Box
          p={20}
          rounded={"lg"}
          boxShadow={"lg"}
          bg={useColorModeValue("blue.200", "green.700")}>
          <Stack spacing={4}>
            <Stack align={"center"}>
              <Heading fontSize={"5xl"}>Home Page</Heading>
            </Stack>

            <Heading fontSize={"3xm"}>
              <NavLink to={"/linkage"}>Go to Link Page</NavLink> <br /> <br />
              <NavLink to={"/editor"}>Go to Editor Page</NavLink> <br /> <br />
              <NavLink to={"/admin"}>Go to Admin Page</NavLink> <br /> <br />
              <NavLink to={"/lounge"}>Go to Lounge Page</NavLink> <br /> <br />
            </Heading>

            <Stack spacing={10}>
              <Button
                onClick={handleLogin}
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.600",
                }}>
                Logout
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
