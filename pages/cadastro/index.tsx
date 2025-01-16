import React, { useState } from "react";
import { toast } from "react-toastify"; // Para mensagens de feedback
import { Link, useNavigate } from "react-router-dom"; // useNavigate para redirecionamento
import "./style.css";

export function Cadastro() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate(); // Hook para navegação

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Verifica se o usuário já existe no localStorage
    const storedEmail = localStorage.getItem("email");

    if (storedEmail === email) {
      toast.error("Este email já está cadastrado.");
    } else {
      // Salva as credenciais no localStorage
      localStorage.setItem("email", email);
      localStorage.setItem("senha", senha);

      toast.success("Usuário cadastrado com sucesso!");
      setEmail(""); // Reseta os campos após sucesso
      setSenha("");

      // Redireciona para a página de login
      navigate("/"); // Muda a URL para o login
    }
  };

  return (
    <>
      <body className="bodyCadastro">
        <img
          className="logoCadastro"
          src="src/assets/logopagbank.png"
          alt="Logo PagBank"
        />
        <div className="formContainerCadastro">
          <h2>Cadastro</h2>
          <form onSubmit={handleSubmit}>
            <div className="inputGroupCadastro">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                placeholder="Digite seu email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="inputGroupCadastro">
              <label htmlFor="senha">Senha:</label>
              <input
                type="password"
                id="senha"
                placeholder="Digite sua senha"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                required
              />
            </div>
            <div className="buttonsCadastro">
              <button type="submit" className="bEnviarCadastro">
                Cadastrar
              </button>
              <a className="aLogin">
                <Link to="/">Deseja voltar para o login?</Link>
              </a>
            </div>
          </form>
        </div>
      </body>
    </>
  );
}
