// src/services/pagseguroApi.ts
import axios from "axios";

const PAGSEGURO_API_URL = "https://sandbox.api.pagseguro.com/orders";

// Função para criar um pedido no PagSeguro
export const criarPedido = async (orderData: any, token: string) => {
  try {
    const response = await axios.post(PAGSEGURO_API_URL, orderData, {
      headers: {
        Authorization: `Bearer ${token}`, // Token de autenticação
        "Content-Type": "application/json",
      },
    });

    if (response.status === 201) {
      return response.data; // Retorna os dados do pedido criado
    }
    throw new Error("Falha na criação do pedido");
  } catch (error: any) {
    console.error(
      "Erro ao criar pedido:",
      error.response?.data || error.message
    );
    throw new Error("Erro ao criar pedido");
  }
};
