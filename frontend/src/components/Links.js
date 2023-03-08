import { Box, Flex, Stack, Heading, useColorModeValue } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

export default function Links() {
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
              <Heading fontSize={"6xl"}>Public</Heading>
            </Stack>

            <Heading fontSize={"3xm"}>
              <NavLink to={"/auth"}>Go to Login</NavLink> <br /> <br />
              <NavLink to={"/register"}>Go to Signup</NavLink>
            </Heading>

            <Stack align={"center"}>
              <Heading fontSize={"6xl"}>Private</Heading>
            </Stack>

            <Heading fontSize={"3xm"}>
              <NavLink to={"/"}>Home</NavLink> <br /> <br />
              <NavLink to={"/editor"}>Editor Page</NavLink> <br /> <br />
              <NavLink to={"/admin"}>Admin Page</NavLink> <br /> <br />
            </Heading>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
