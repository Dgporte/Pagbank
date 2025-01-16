import React, { useContext } from "react";
import { GeralContext } from "../../context/index";

// Tipagem para o produto
interface Produto {
  nome: string;
  preco: number;
  foto: string;
}

interface CardProps {
  produto: Produto;
  onAddToCart: (produto: Produto) => void;
}

const Card: React.FC<CardProps> = ({ produto, onAddToCart }) => {
  return (
    <div className="card">
      <img src={produto.foto} alt={produto.nome} className="card-img" />
      <h3>{produto.nome}</h3>
      <p>R$ {produto.preco.toFixed(2)}</p>
      <button onClick={() => onAddToCart(produto)}>
        Adicionar ao Carrinho
      </button>
    </div>
  );
};

export default Card;
