import { render, screen } from "@testing-library/react";
import React from "react";
import App from "../App";
import api from "../api";
import { act } from "react-dom/test-utils";

jest.mock("../api");

describe("Requicicoes para API", () => {
  test("Exibir lista da transacoes atraves da API", async () => {
    api.listaTransacoes.mockResolvedValue([
      {
        transacao: "saque",
        valor: "10",
        data: "03/11/2022",
        id: 3,
      },
      {
        transacao: "saque",
        valor: "10",
        data: "03/11/2022",
        id: 4,
      },
    ]);

    act(() => {
      render(<App />);
    });

    expect(await screen.findAllByText("saque")).toBeTruthy();

    expect(screen.getByTestId("transacoes").children.length).toBe(2);
  });
});
