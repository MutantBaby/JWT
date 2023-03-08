import {
  Box,
  Flex,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Missing() {
  const navigate = useNavigate();

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
              <Heading fontSize={"5xl"}>Missing Page</Heading>
              <Heading fontSize={"2xl"} color={"orange.500"}>
                Error Page Not Found 💀
              </Heading>
            </Stack>

            <Stack spacing={10}>
              <Button
                onClick={() => navigate("/linkage")}
                bg={"red.400"}
                color={"white"}
                _hover={{
                  bg: "red.600",
                }}>
                Back to Link Page
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
