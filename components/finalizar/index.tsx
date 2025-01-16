import React, { useState } from "react";
import { criarPedido } from "../../api/pagamento/Api"; // Importe o serviço
import "./style.css";

export function FinalizarCompra({ carrinho }: { carrinho: any[] }) {
  const [mostrarModal, setMostrarModal] = useState(false);
  const [qrCodeTextUrl, setQrCodeTextUrl] = useState<string | null>(null);
  const [qrCodeImageUrl, setQrCodeImageUrl] = useState<string | null>(null);
  const [erro, setErro] = useState<string | null>(null);
  const [formaPagamento, setFormaPagamento] = useState("cartao"); // Forma de pagamento inicial
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    tax_id: "",
    street: "",
    number: "",
    complement: "",
    locality: "",
    city: "",
    region_code: "",
    country: "",
    postal_code: "",
    reference_id: "",
    description: "",
    boleto: {
      due_date: "2025-01-25", // Data predefinida
      instruction_lines: {
        line_1: "Favor efetuar o pagamento até a data de vencimento.",
        line_2: "Após o vencimento, acrescerão juros e multa.",
      },
    },
    // Dados do Cartão de Crédito
    card: {
      number: "",
      exp_month: "",
      exp_year: "",
      security_code: "",
      installments: 1, // Quantidade de parcelas
      capture: true, // Captura ou pré-autorização
      soft_descriptor: "", // Descrição que aparecerá na fatura
      holder: {
        name: "", // Nome do portador
        tax_id: "", // CPF do portador
      },
      token_data: {
        requestor_id: "", // Identificador de quem gerou o Token de Bandeira
        wallet: "", // Tipo de carteira que armazenou o Token de Bandeira
        cryptogram: "", // Criptograma gerado pela bandeira
        ecommerce_domain: "br.com.pagseguro", // Identificador do domínio
        assurance_level: 3, // Nível de confiança do Token
      },
    },
  });

  const handleFinalizarCompra = () => {
    setMostrarModal(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name.startsWith("boleto")) {
      // Atualiza os campos de boleto
      const [_, key] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        boleto: {
          ...prevState.boleto,
          [key]: value,
        },
      }));
    } else if (name.startsWith("card")) {
      // Atualiza os campos do cartão
      const [_, key] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        card: {
          ...prevState.card,
          [key]: value,
        },
      }));
    } else if (name.startsWith("card")) {
      // Atualiza os campos do cartão
      const [_, key] = name.split(".");
      setFormData((prevState) => ({
        ...prevState,
        card: {
          ...prevState.card,
          [key]: value,
        },
      }));
    } else {
      // Atualiza os campos gerais
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFormaPagamentoChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setFormaPagamento(e.target.value);
  };

  const handleConfirmarCompra = async () => {
    const totalCarrinho = carrinho.reduce(
      (total, produto) => total + produto.preco,
      0
    );

    const dadosPedido = {
      customer: {
        name: formData.name,
        email: formData.email,
        tax_id: formData.tax_id,
        address: {
          street: formData.street,
          number: formData.number,
          complement: formData.complement,
          locality: formData.locality,
          city: formData.city,
          region_code: formData.region_code,
          country: formData.country,
          postal_code: formData.postal_code,
        },
      },
      items: carrinho.map((produto) => ({
        name: produto.nome,
        quantity: 1,
        unit_amount: produto.preco * 100, // Convertendo para centavos
      })),
      amount: {
        value: totalCarrinho * 100, // Total do carrinho em centavos
        currency: "BRL", // Moeda (Brasil - Real)
      },
      notification_urls: ["http://localhost:5173/"],
      reference_id: formData.reference_id,
      description: formData.description,
      boleto:
        formaPagamento === "boleto"
          ? {
              due_date: formData.boleto.due_date,
              instruction_lines: {
                line_1: formData.boleto.instruction_lines.line_1,
                line_2: formData.boleto.instruction_lines.line_2,
              },
            }
          : undefined,
      card:
        formaPagamento === "cartaoCredito" || formaPagamento === "cartaoDebito"
          ? {
              number: formData.card.number,
              exp_month: formData.card.exp_month,
              exp_year: formData.card.exp_year,
              security_code: formData.card.security_code,
              installments: formData.card.installments,
              capture: formData.card.capture,
              soft_descriptor: formData.card.soft_descriptor,
              holder: {
                name: formData.card.holder.name,
                tax_id: formData.card.holder.tax_id,
              },
              token_data: {
                requestor_id: formData.card.token_data.requestor_id,
                wallet: formData.card.token_data.wallet,
                cryptogram: formData.card.token_data.cryptogram,
                ecommerce_domain: formData.card.token_data.ecommerce_domain,
                assurance_level: formData.card.token_data.assurance_level,
              },
            }
          : undefined,
    };

    try {
      const resposta = await criarPedido(dadosPedido);

      if (resposta.error) {
        throw new Error(resposta.error);
      }

      alert("Pedido criado com sucesso!");
      setMostrarModal(false); // Fecha o modal após a confirmação
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      alert("Erro ao finalizar compra: " + error.message);
    }
  };

  // Funções auxiliares para a criação do pedido
  const criarPedido = async (dadosPedido: any) => {
    const options = {
      method: "POST",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer 9ea3b11c-586c-4362-94fa-c5e4f8dea174f080f7654f6cb12790caba6c86ef5c41f20d-ded7-48ce-8eac-46fed269fbdb",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dadosPedido),
    };

    try {
      const resposta = await fetch(
        "https://sandbox.api.pagseguro.com/",
        options
      );

      console.log("Status da resposta:", resposta.status);

      if (!resposta.ok) {
        const errorData = await resposta.json();
        console.error("Detalhes do erro:", errorData);
        throw new Error(
          errorData.message || "Erro desconhecido na criação do pedido"
        );
      }

      const data = await resposta.json();
      console.log("Pedido criado com sucesso:", data);
      return data;
    } catch (error) {
      console.error("Erro ao criar pedido:", error);
      alert("Erro ao criar pedido: " + error.message);
      throw error;
    }
  };

  const criarPedidoComQRCode = async () => {
    try {
      // Substitua essa URL com a URL real do seu serviço de geração de QR Code
      const response = await fetch("https://sandbox.api.pagseguro.com/orders");
      const data = await response.json();

      if (data.qr_codes && data.qr_codes.length > 0) {
        const qrCodeData = data.qr_codes[0];

        // A URL de texto para o QR Code
        const qrCodeText = qrCodeData.links.find(
          (link: any) => link.media === "text/plain"
        )?.url;

        // A URL da imagem do QR Code
        const qrCodeImage = qrCodeData.links.find(
          (link: any) => link.media === "image/png"
        )?.url;

        if (qrCodeText && qrCodeImage) {
          setQrCodeTextUrl(qrCodeText);
          setQrCodeImageUrl(qrCodeImage);
        } else {
          setErro("QR Code não encontrado.");
        }
      } else {
        setErro("Erro ao gerar QR Code.");
      }
    } catch (error) {
      setErro("Erro na requisição ao servidor.");
      console.error("Erro ao criar pedido:", error);
    }
  };

  return (
    <div>
      {/* Botão de Finalizar Compra */}
      <button
        onClick={handleFinalizarCompra}
        className="button-finalizar-compra"
      >
        Finalizar Compra
      </button>

      {/* Modal de Confirmação */}
      {mostrarModal && (
        <div className="modal-overlay">
          <div className="modal-container">
            <h2>Confirme os dados da compra</h2>

            {/* Exibindo os produtos do carrinho */}
            <div className="carrinho-itens">
              <h3>Itens no Carrinho:</h3>
              {carrinho.map((produto, index) => (
                <div key={index} className="produto-carrinho">
                  <p>
                    <strong>{produto.nome}</strong> - Quantidade: 1 - Preço: R$
                    {produto.preco.toFixed(2)}
                  </p>
                </div>
              ))}
            </div>

            {/* Exibindo o total do carrinho */}
            <div className="total-carrinho">
              <h3>Total:</h3>
              <p>
                R$
                {carrinho
                  .reduce((total, produto) => total + produto.preco, 0)
                  .toFixed(2)}
              </p>
            </div>

            {/* Formulário de dados de usuário */}
            <form>
              <label htmlFor="name">Nome</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
              />

              <label htmlFor="email">Email</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
              />

              <label htmlFor="tax_id">CPF/CNPJ</label>
              <input
                type="text"
                id="tax_id"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                placeholder="Digite seu CPF ou CNPJ"
                required
              />

              {/* Formulário de endereço */}
              <h3>Endereço</h3>
              <label htmlFor="street">Rua</label>
              <input
                type="text"
                id="street"
                name="street"
                value={formData.street}
                onChange={handleChange}
                placeholder="Digite a rua"
                required
              />

              <label htmlFor="number">Número</label>
              <input
                type="text"
                id="number"
                name="number"
                value={formData.number}
                onChange={handleChange}
                placeholder="Digite o número"
                required
              />

              <label htmlFor="complement">Complemento</label>
              <input
                type="text"
                id="complement"
                name="complement"
                value={formData.complement}
                onChange={handleChange}
                placeholder="Digite o complemento (opcional)"
              />

              <label htmlFor="locality">Bairro</label>
              <input
                type="text"
                id="locality"
                name="locality"
                value={formData.locality}
                onChange={handleChange}
                placeholder="Digite o bairro"
                required
              />

              <label htmlFor="city">Cidade</label>
              <input
                type="text"
                id="city"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Digite a cidade"
                required
              />

              <label htmlFor="region_code">Código do Estado</label>
              <input
                type="text"
                id="region_code"
                name="region_code"
                value={formData.region_code}
                onChange={handleChange}
                placeholder="Digite o código do estado"
                required
              />

              <label htmlFor="country">País</label>
              <input
                type="text"
                id="country"
                name="country"
                value={formData.country}
                onChange={handleChange}
                placeholder="Digite o país"
                required
              />

              <label htmlFor="postal_code">CEP</label>
              <input
                type="text"
                id="postal_code"
                name="postal_code"
                value={formData.postal_code}
                onChange={handleChange}
                placeholder="Digite o CEP"
                required
              />

              <h3>Forma de Pagamento</h3>
              {/* Dropdown para selecionar a forma de pagamento */}
              <select
                name="formaPagamento"
                value={formaPagamento}
                onChange={handleFormaPagamentoChange} // Atualiza a forma de pagamento selecionada
              >
                <option value="cartao">Cartão de Crédito</option>
                <option value="debito">Débito</option>
                <option value="boleto">Boleto</option>
                <option value="pix">Pix</option>
              </select>

              {(formaPagamento === "cartao" ||
                formaPagamento === "cartaoCredito" ||
                formaPagamento === "debito") && (
                <div>
                  <label htmlFor="card.number">Número do Cartão</label>
                  <input
                    type="text"
                    id="card.number"
                    name="card.number"
                    value={formData.card.number}
                    onChange={handleChange}
                    placeholder="Digite o número do cartão"
                    required
                  />

                  <label htmlFor="card.exp_month">Mês de Validade</label>
                  <input
                    type="text"
                    id="card.exp_month"
                    name="card.exp_month"
                    value={formData.card.exp_month}
                    onChange={handleChange}
                    placeholder="Mês de validade"
                    required
                  />

                  <label htmlFor="card.exp_year">Ano de Validade</label>
                  <input
                    type="text"
                    id="card.exp_year"
                    name="card.exp_year"
                    value={formData.card.exp_year}
                    onChange={handleChange}
                    placeholder="Ano de validade"
                    required
                  />

                  <label htmlFor="card.security_code">
                    Código de Segurança
                  </label>
                  <input
                    type="text"
                    id="card.security_code"
                    name="card.security_code"
                    value={formData.card.security_code}
                    onChange={handleChange}
                    placeholder="Código de segurança"
                    required
                  />

                  <label htmlFor="card.installments">Parcelas</label>
                  <input
                    type="number"
                    id="card.installments"
                    name="card.installments"
                    value={formData.card.installments}
                    onChange={handleChange}
                    placeholder="Quantidade de parcelas"
                    required
                  />
                </div>
              )}

              {/* Formulário de Boleto */}
              {formaPagamento === "boleto" && (
                <div>
                  <h3>Dados do Boleto</h3>
                  <label htmlFor="boleto.due_date">Data de Vencimento</label>
                  <input
                    type="date"
                    id="boleto.due_date"
                    name="boleto.due_date"
                    value={formData.boleto.due_date}
                    onChange={handleChange}
                    required
                  />

                  <label htmlFor="boleto.instruction_lines.line_1">
                    Linha de Instrução 1
                  </label>
                  <input
                    type="text"
                    id="boleto.instruction_lines.line_1"
                    name="boleto.instruction_lines.line_1"
                    value={formData.boleto.instruction_lines.line_1}
                    onChange={handleChange}
                    placeholder="Digite a linha de instrução 1"
                    required
                  />

                  <label htmlFor="boleto.instruction_lines.line_2">
                    Linha de Instrução 2
                  </label>
                  <input
                    type="text"
                    id="boleto.instruction_lines.line_2"
                    name="boleto.instruction_lines.line_2"
                    value={formData.boleto.instruction_lines.line_2}
                    onChange={handleChange}
                    placeholder="Digite a linha de instrução 2"
                    required
                  />

                  {erro && <p style={{ color: "red" }}>{erro}</p>}

                  {qrCodeTextUrl && (
                    <div>
                      <h3>QR Code (Texto):</h3>
                      <a
                        href={qrCodeTextUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {qrCodeTextUrl}
                      </a>
                    </div>
                  )}

                  {qrCodeImageUrl && (
                    <div>
                      <h3>QR Code (Imagem):</h3>
                      <img src={qrCodeImageUrl} alt="QR Code" />
                    </div>
                  )}
                </div>
              )}
            </form>

            <button onClick={handleConfirmarCompra}>Confirmar Compra</button>
            <button onClick={() => setMostrarModal(false)}>Fechar</button>
          </div>
        </div>
      )}
    </div>
  );
}
