import React from "react";
import { render } from "@testing-library/react";
import Transacoes from "./Transacoes";

const transacoesFeitas = [
  {
    valor: 10,
    transacao: "saque",
    data: "10/08/2020",
    id: 1,
  },
  {
    transacao: "deposito",
    valor: "20",
    data: "26/09/2020",
    id: 2,
  },
];

describe("Lista de transacoes", () => {
  test("Snpashot de lista de transacoes", () => {
    const { container } = render(<Transacoes transacoes={transacoesFeitas} />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
