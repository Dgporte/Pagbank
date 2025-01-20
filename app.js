import express from "express";
import axios from "axios";
import dotenv from "dotenv";
import cors from "cors";

// dotenv.config(); // Carregar variáveis de ambiente do .env

const app = express();

const TOKENAPI = "9ea3b11c-586c-4362-94fa-c5e4f8dea174f080f7654f6cb12790caba6c86ef5c41f20d-ded7-48ce-8eac-46fed269fbdb";

// Permitir CORS para todas as origens (ou especifique a origem do frontend)
app.use(cors({ origin: '*' }));

// Configurar express para lidar com JSON
app.use(express.json());

// URL da API do PagSeguro
const PAGSEGURO_API_URL = "https://sandbox.api.pagseguro.com/orders"; // URL correta da API do PagSeguro

// Rota para criar o pedido no PagSeguro
app.post("/orders", async (req, res) => {
  console.log("Dados recebidos do frontend:", req.body); // Log para verificar se os dados estão chegando corretamente

  const dadosPedido = req.body; // Dados do pedido enviados do frontend
  console.log("Dados do pedido:", dadosPedido); // Log para verificar os dados do pedido
  const options = {
    method: "POST",
    headers: {
      accept: "*/*",
      Authorization: `Bearer ${TOKENAPI}`, // Usando o token configurado no .env
      "Content-Type": "application/json",
    },
    data: dadosPedido, // Envia os dados recebidos do frontend para a API do PagSeguro
    url: PAGSEGURO_API_URL, // URL completa para a API do PagSeguro
  };

  try {
    console.log("Enviando requisição para o PagSeguro..."); // Log para saber que estamos fazendo a requisição para o PagSeguro
    const resposta = await axios(options);
    console.log("Resposta do PagSeguro:", resposta.data); // Log para verificar a resposta da API
    res.status(200).json(resposta.data);
  } catch (error) {
    console.error("Erro ao criar pedido no PagSeguro:", error); // Log para identificar erro na requisição
    res.status(500).json({
      error: error.response?.data || error.message || "Erro desconhecido",
    });
  }
});

// Iniciar o servidor na porta 3000
app.listen(3000, () => {
  console.log("Servidor backend rodando na porta 3000");
});
