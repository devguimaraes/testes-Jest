import { render } from "@testing-library/react";
import React from "react";
import Transacao from "./Transacao";

describe("Componente de transacao do extrato", () => {
  test("Snapshot do componente deve permancer sempre o mesmo", async () => {
    const { container } = await render(
      <Transacao data="02/11/2022" tipo="saque" valor="20.00" />
    );

    expect(container).toMatchSnapshot();
  });
});
