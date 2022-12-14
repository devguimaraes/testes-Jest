/* eslint-disable react/react-in-jsx-scope */
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import App, { calcularNovoSaldo } from "../App";
import { act } from "react-dom/test-utils";

describe("Componente Principal", () => {
  describe("Quando abrir app do banco", () => {
    it("O nome do banco é exibido", async () => {
      await act(async () => {
        render(<App />);
      });

      const nomeDoBanco = screen.getByText("ByteBank");

      expect(nomeDoBanco).toBeInTheDocument();
    });

    it("Saldo inicial sendo exibido", async () => {
      await act(async () => {
        render(<App />);
      });

      const saldoEmTela = screen.getByText("Saldo:");
      expect(saldoEmTela).toBeInTheDocument();
    });

    it("O botão de realizar operacao é exibido", async () => {
      await act(async () => {
        render(<App />);
      });

      const botao = screen.getByRole("button");
      expect(botao).toBeInTheDocument();
    });
  });

  describe("Quando realizar a transação: ", () => {
    it("De saque, o saldo precisa diminuir", () => {
      act(() => {
        render(<App />);
      });

      act(() => {
        const valores = {
          transacao: "saque",
          valor: 50,
        };

        const novoSaldo = calcularNovoSaldo(valores, 150);

        expect(novoSaldo).toBe(100);
      });
    });

    it("De saque, a transacao deve ser realizada", async () => {
      await act(async () => {
        render(<App />);
      });

      const saldo = screen.getByText("R$ 1000");
      const transacao = screen.getByLabelText("Saque");
      const valor = screen.getByTestId("valor");
      const botao = screen.getByRole("button");

      expect(saldo.textContent).toBe("R$ 1000");
      fireEvent.click(transacao, { target: { value: "saque" } });
      fireEvent.change(valor, { target: { value: 10 } });
      fireEvent.click(botao);

      expect(saldo.textContent).toBe("R$ 990");
    });

    it("De deposito o saldo precisa aumentar", async () => {
      await act(async () => {
        render(<App />);
      });

      const valores = {
        transacao: "deposito",
        valor: 100,
      };

      const novaSaldo = calcularNovoSaldo(valores, 100);
      expect(novaSaldo).toBe(200);
    });
  });

  describe("Teste de snpashot do APP", () => {
    it("Verifica se elementos renderizam de forma correta", () => {
      const { container } = render(<App />);

      expect(container.firstChild).toMatchSnapshot();
    });
  });
});
