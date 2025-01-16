import React, { useState } from "react";
import Card from "../../components/cardsProduto/index"; // Importe o componente Card
import { criarPedido } from "../../api/pagamento/index"; // Importando a função que cria o pedido
import { FinalizarCompra } from "../../components/finalizar"; // Importando o componente FinalizarCompra
import "./style.css";

export function Home() {
  const [carrinho, setCarrinho] = useState<any[]>([]); // Estado para armazenar os produtos no carrinho
  const [mostrarCarrinho, setMostrarCarrinho] = useState<boolean>(false);

  const handleAddProdutoAoCarrinho = (produto: any) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
  };

  const handleRemoveProdutoDoCarrinho = (index: number) => {
    setCarrinho((prevCarrinho) => prevCarrinho.filter((_, i) => i !== index));
  };

  // Produto de exemplo para passar para o Card
  const produtoExemplo = {
    nome: "Resident Evil 4",
    preco: 399.0,
    foto: "src/assets/residentevil4.jpg", // Link para uma imagem de exemplo
  };
  const produtoExemplo1 = {
    nome: "The Last of Us",
    preco: 299.0,
    foto: "src/assets/thelastofus.jpg", // Link para uma imagem de exemplo
  };
  const produtoExemplo2 = {
    nome: "Alan Wake 2",
    preco: 159.0,
    foto: "src/assets/alan-wake-2.jpg", // Link para uma imagem de exemplo
  };
  const produtoExemplo3 = {
    nome: "Resident Evil 2 Remake",
    preco: 310.0,
    foto: "src/assets/re2.jpg", // Link para uma imagem de exemplo
  };
  const produtoExemplo4 = {
    nome: "Resident Evil 7",
    preco: 199.0,
    foto: "src/assets/re7.webp", // Link para uma imagem de exemplo
  };
  const produtoExemplo5 = {
    nome: "Hogwarts Legacy",
    preco: 259.0,
    foto: "src/assets/hp.jpg", // Link para uma imagem de exemplo
  };

  // Cálculo do valor total
  const calcularTotal = () => {
    return carrinho.reduce((total, produto) => total + produto.preco, 0);
  };

  return (
    <div className="container-home">
      <header className="header-home">
        <div className="logo-container-home">
          <img
            src="src/assets/logopagbank.png"
            alt="Logo"
            className="logo-home"
          />
        </div>
      </header>
      <main className="main-content-home">
        <h1 className="title-home">Nossos Produtos</h1>
        <div className="produtos-container">
          {/* Exibindo o Card com os produtos */}
          <Card
            produto={produtoExemplo}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
          <Card
            produto={produtoExemplo1}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
          <Card
            produto={produtoExemplo2}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
          <Card
            produto={produtoExemplo3}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
          <Card
            produto={produtoExemplo4}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
          <Card
            produto={produtoExemplo5}
            onAddToCart={handleAddProdutoAoCarrinho}
          />
        </div>

        {/* Botão para mostrar ou esconder o carrinho */}
        <button
          onClick={() => setMostrarCarrinho(!mostrarCarrinho)}
          className="button-toggle-carrinho"
        >
          {mostrarCarrinho ? "Esconder Carrinho" : "Mostrar Carrinho"}
        </button>

        {/* Div que contém o carrinho de compras */}
        {mostrarCarrinho && (
          <div className="carrinho-container">
            <h3>Produtos Selecionados</h3>
            <ul>
              {carrinho.map((produto, index) => (
                <li key={index}>
                  <p>{produto.nome}</p>
                  <p>R$ {produto.preco.toFixed(2)}</p>
                  <button
                    onClick={() => handleRemoveProdutoDoCarrinho(index)}
                    className="button-remover-item"
                  >
                    Remover
                  </button>
                </li>
              ))}
            </ul>
            <p className="total">
              <strong>Total: R$ {calcularTotal().toFixed(2)}</strong>
            </p>

            {/* Componente FinalizarCompra */}
            <FinalizarCompra carrinho={carrinho} />
          </div>
        )}
      </main>
    </div>
  );
}
