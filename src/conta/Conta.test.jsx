import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import Conta from "./Conta";
import { act } from "react-dom/test-utils";

describe("Componente de Conta", () => {
  test("Exibir o saldo da conta com formatacao monetário", async () => {
    act(() => {
      render(<Conta saldo={1000} />);
    });

    const saldo = screen.getByTestId("saldo-conta");

    expect(saldo.textContent).toBe("R$ 1000");
  });

  test("Verifica se a funcao realizar transacao é chamada ao clicar no botao", () => {
    const funcaoRealizarTransacao = jest.fn();

    render(<Conta saldo={1000} realizarTransacao={funcaoRealizarTransacao} />);

    const botao = screen.getByRole("button");
    const inputValor = screen.getByTestId("valor");

    expect(botao).toBeDisabled();

    fireEvent.change(inputValor, {
      target: {
        value: "1",
      },
    });
    fireEvent.click(botao);
    expect(funcaoRealizarTransacao).toHaveBeenCalled();
  });

  test("botao só pode ser clicado, quando o valor do formulario for preenchido", () => {
    render(<Conta saldo={1000} />);

    const inputValor = screen.getByTestId("valor");
    const botao = screen.getByRole("button");

    fireEvent.change(inputValor, {
      target: {
        value: "1",
      },
    });

    expect(botao).not.toBeDisabled();
  });
});

describe("Teste de Snpashot da Conta", () => {
  test("Componente Conta", () => {
    const { container } = render(<Conta />);

    expect(container.firstChild).toMatchSnapshot();
  });
});
