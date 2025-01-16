import React, { useState } from "react";
import { toast } from "react-toastify"; // Para mensagens de feedback
import { Link, useNavigate } from "react-router-dom";
import "./style.css";

export function Login() {
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const storedEmail = localStorage.getItem("email");
    const storedSenha = localStorage.getItem("senha");

    if (storedEmail === email && storedSenha === senha) {
      toast.success("Login realizado com sucesso!");
      console.log("Usuário logado com sucesso:", { email, senha });

      localStorage.setItem("token", "user_token_example");
      navigate("/home"); // Redireciona após o login
    } else {
      console.error("Erro ao fazer login: Credenciais inválidas");
      toast.error("Erro ao tentar fazer login. Verifique suas credenciais.");
    }
  };

  return (
    <body className="body">
      <img
        className="logo"
        src="src/assets/logopagbank.png"
        alt="Logo PagBank"
      />
      <div className="form-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="input-group">
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
          <div className="input-group">
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
          <div className="buttons">
            <button type="submit" className="bEnviar">
              Entrar
            </button>
            <a className="aCadastro">
              <Link to="/cadastro">Deseja fazer um cadastro?</Link>
            </a>
          </div>
        </form>
      </div>
    </body>
  );
}
