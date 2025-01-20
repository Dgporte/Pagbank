import axios from "axios";

const API_URL = "http://localhost:3000";

export const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const criarPedido = async (dadosPedido: any) => {
  try {
    const response = await api.post("/orders", dadosPedido);

    return response.data;
  } catch (error: any) {
    console.error(
      "Erro ao criar pedido:",
      error.response?.data || error.message
    ); // Log para erro
    throw new Error(error.response?.data?.message || "Erro ao criar pedido");
  }
};

// import axios from "axios";

// // URL do seu próprio servidor proxy
// const PROXY_URL = "http://localhost:8080/";

// // URL da API do PagSeguro
// const API_URL = "https://sandbox.api.pagseguro.com/orders";

// export const api = axios.create({
//   baseURL: PROXY_URL + API_URL, // Usando o proxy para contornar CORS
//   headers: {
//     "Content-Type": "application/json",
//     "X-Requested-With": "XMLHttpRequest",
//   },
// });

// export const criarPedido = async (dadosPedido: any) => {
//   try {
//     const response = await api.post("", dadosPedido); // Fazendo a requisição através do proxy
//     return response.data;
//   } catch (error: any) {
//     console.error(
//       "Erro ao criar pedido:",
//       error.response?.data || error.message
//     ); // Log para erro
//     throw new Error(error.response?.data?.message || "Erro ao criar pedido");
//   }
// };
