import React, { createContext, useState, ReactNode } from "react";

// Tipagem para o produto
interface Produto {
  nome: string;
  preco: number;
  foto: string;
}

// Tipagem para o estado do contexto
interface GeralContextType {
  carrinho: Produto[];
  addProdutoAoCarrinho: (produto: Produto) => void;
}

// Definindo um valor inicial para o contexto
const GeralContext = createContext<GeralContextType>({
  carrinho: [],
  addProdutoAoCarrinho: () => {},
});

interface GeralProviderProps {
  children: ReactNode;
}

const GeralProvider: React.FC<GeralProviderProps> = ({ children }) => {
  const [carrinho, setCarrinho] = useState<Produto[]>([]);

  const addProdutoAoCarrinho = (produto: Produto) => {
    setCarrinho((prevCarrinho) => [...prevCarrinho, produto]);
  };

  return (
    <GeralContext.Provider value={{ carrinho, addProdutoAoCarrinho }}>
      {children}
    </GeralContext.Provider>
  );
};

export { GeralProvider, GeralContext };
