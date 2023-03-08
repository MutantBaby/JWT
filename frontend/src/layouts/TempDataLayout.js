import { Heading } from "@chakra-ui/react";
import React from "react";

import { Outlet } from "react-router-dom";

function TempDataLayout() {
  return (
    <main>
      <Heading fontSize={"4xl"} color={"green.300"}>
        TempDataLayout
      </Heading>

      <section>
        <Outlet />
      </section>
    </main>
  );
}

export default TempDataLayout;
