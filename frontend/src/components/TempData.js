import React from "react";

import axios from "../api/axios";

import { useLoaderData } from "react-router-dom";
import { Box, Heading, Stack } from "@chakra-ui/react";
import { deSerilizer, serilizer } from "../utils/utils";

const employeeURL = `/employees`;

function TempData() {
  const employeesLoaderData = useLoaderData();

  return (
    <Box>
      <Heading fontSize={"3xl"} color={"red.300"}>
        TempData
      </Heading>

      <Stack>
        {Object.entries(employeesLoaderData)[0][1]?.map((emp, id) => (
          <div key={id}>
            <p>Username =&gt; {emp.username}</p>
            <p>Password =&gt; {emp.password}</p>
            <p>Roles =&gt; {emp.roles}</p>
          </div>
        ))}
      </Stack>
    </Box>
  );
}

export const tempDataLoader = async () => {
  const res = await axios.get(employeeURL);
  const data = JSON.stringify(res, serilizer, 2);
  const endResult = JSON.parse(data, deSerilizer, 2);

  return endResult;
};

export default TempData;
