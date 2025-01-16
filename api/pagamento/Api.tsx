import axios from "axios";

const API_URL = "https://sandbox.api.pagseguro.com/"; // Substitua pela URL correta
const AUTH_TOKEN = "9ea3b11c-586c-4362-94fa-c5e4f8dea174f080f7654f6cb12790caba6c86ef5c41f20d-ded7-48ce-8eac-46fed269fbdb"; // Substitua pelo token real

export const criarPedido = async (dadosPedido: any) => {
  try {
    const response = await axios.post(API_URL, dadosPedido, {
      headers: {
        Authorization: `Bearer ${AUTH_TOKEN}`,
        "Content-Type": "application/json",
      },
    });
    return response.data; // Retorna os dados da resposta
  } catch (error: any) {
    throw new Error(error.response?.data?.message || "Erro ao criar pedido");
  }
};
