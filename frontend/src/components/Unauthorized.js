import {
  Box,
  Flex,
  Stack,
  Button,
  Heading,
  useColorModeValue,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function Lounge() {
  const navigate = useNavigate();

  const goBack = () => navigate(-1);
 
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
          bg={useColorModeValue("orange.200", "black")}>
          <Stack spacing={4}>
            <Stack align={"center"}>
              <Heading fontSize={"5xl"}>UnAuthorized</Heading>
              <Heading fontSize={"2xl"} color={"red.500"}>
                You are not allowed 🧟‍♂️🤬
              </Heading>
            </Stack>

            <Stack spacing={10}>
              <Button
                onClick={goBack}
                bg={"purple.400"}
                color={"white"}
                _hover={{
                  bg: "purple.600",
                }}>
                Go Back
              </Button>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
}
