import React, { useState } from "react";
// import { criarPedido } from "../../api/pagamento/Api"; // Importe o serviço
import axios from "axios";
import "./style.css";
import InputField from "../input";
import AddressForm from "../endereco";
import SelectField from "../dropdown";
import PaymentForm from "../pagamento";
import { criarPedido } from "../../api/pagamento/Api";

export function FinalizarCompra({ carrinho }: { carrinho: any[] }) {
  const [mostrarModal, setMostrarModal] = useState(false);
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
      due_date: "2025-01-25", // Data predefinid
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

  // const handleConfirmarCompra = async () => {
  //   // URL do seu próprio servidor proxy
  //   const PROXY_URL = "http://localhost:8080/";

  //   // URL da API do PagSeguro
  //   const API_URL = "https://sandbox.api.pagseguro.com/orders";

  //   // Calcular o total do carrinho
  //   const totalCarrinho = carrinho.reduce(
  //     (total, produto) => total + produto.preco,
  //     0
  //   );

  //   // Montar o objeto de dados do pedido
  //   const dadosPedido = {
  //     customer: {
  //       name: formData.name,
  //       email: formData.email,
  //       tax_id: formData.tax_id,
  //       address: {
  //         street: formData.street,
  //         number: formData.number,
  //         complement: formData.complement,
  //         locality: formData.locality,
  //         city: formData.city,
  //         region_code: formData.region_code,
  //         country: formData.country,
  //         postal_code: formData.postal_code,
  //       },
  //     },
  //     items: carrinho.map((produto) => ({
  //       name: produto.nome,
  //       quantity: 1,
  //       unit_amount: produto.preco * 100, // Convertendo para centavos
  //     })),
  //     amount: {
  //       value: totalCarrinho * 100, // Total do carrinho em centavos
  //       currency: "BRL", // Moeda (Brasil - Real)
  //     },
  //     notification_urls: ["http://localhost:5173/"], // URL para notificação
  //     reference_id: formData.reference_id,
  //     description: formData.description,
  //     boleto:
  //       formaPagamento === "boleto"
  //         ? {
  //             due_date: formData.boleto.due_date,
  //             instruction_lines: {
  //               line_1: formData.boleto.instruction_lines.line_1,
  //               line_2: formData.boleto.instruction_lines.line_2,
  //             },
  //           }
  //         : undefined,
  //     card:
  //       formaPagamento === "cartaoCredito" || formaPagamento === "cartaoDebito"
  //         ? {
  //             number: formData.card.number,
  //             exp_month: formData.card.exp_month,
  //             exp_year: formData.card.exp_year,
  //             security_code: formData.card.security_code,
  //             installments: formData.card.installments,
  //             capture: formData.card.capture,
  //             soft_descriptor: formData.card.soft_descriptor,
  //             holder: {
  //               name: formData.card.holder.name,
  //               tax_id: formData.card.holder.tax_id,
  //             },
  //             token_data: {
  //               requestor_id: formData.card.token_data.requestor_id,
  //               wallet: formData.card.token_data.wallet,
  //               cryptogram: formData.card.token_data.cryptogram,
  //               ecommerce_domain: formData.card.token_data.ecommerce_domain,
  //               assurance_level: formData.card.token_data.assurance_level,
  //             },
  //           }
  //         : undefined,
  //   };

  //   try {
  //     // Fazer a requisição diretamente no handle
  //     const response = await axios.post(PROXY_URL + API_URL, dadosPedido, {
  //       headers: {
  //         "Content-Type": "application/json",
  //         "X-Requested-With": "XMLHttpRequest",
  //       },
  //     });

  //     // Verificar se houve erro na resposta
  //     if (response.data.error) {
  //       throw new Error(response.data.error);
  //     }

  //     alert("Pedido criado com sucesso!");
  //     setMostrarModal(false); // Fecha o modal após a confirmação
  //   } catch (error: any) {
  //     console.error(
  //       "Erro ao finalizar compra:",
  //       error.response?.data || error.message
  //     );
  //     alert(
  //       "Erro ao finalizar compra: " +
  //         (error.response?.data?.message || error.message)
  //     );
  //   }
  // };

  const handleConfirmarCompra = async () => {
    // Calcular o total do carrinho
    const totalCarrinho = carrinho.reduce(
      (total, produto) => total + produto.preco,
      0
    );

    // Montar o objeto de dados do pedido
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
      notification_urls: ["http://localhost:5173/"], // URL para notificação
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
      // Chamar o método de criarPedido passando os dados coletados
      const resposta = await criarPedido(dadosPedido);

      if (resposta.error) {
        throw new Error(resposta.error);
      }
      console.log("dadospedidos", dadosPedido),
        alert("Pedido criado com sucesso!");
      setMostrarModal(false); // Fecha o modal após a confirmação
    } catch (error) {
      console.error("Erro ao finalizar compra:", error);
      // alert("Erro ao finalizar compra: " + error.message);
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
              <InputField
                label="Nome"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Digite seu nome"
                required
              />
              <InputField
                label="Email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Digite seu email"
                required
              />
              <InputField
                label="CPF/CNPJ"
                id="tax_id"
                name="tax_id"
                value={formData.tax_id}
                onChange={handleChange}
                placeholder="Digite seu CPF/CNPJ"
                required
              />

              <AddressForm formData={formData} handleChange={handleChange} />

              <h3>Forma de Pagamento</h3>
              <SelectField
                label="Forma de Pagamento"
                name="formaPagamento"
                value={formaPagamento}
                onChange={handleFormaPagamentoChange}
                options={[
                  { value: "cartao", label: "Cartão de Crédito" },
                  { value: "debito", label: "Débito" },
                  { value: "boleto", label: "Boleto" },
                  { value: "pix", label: "Pix" },
                ]}
              />

              {(formaPagamento === "cartao" ||
                formaPagamento === "cartaoCredito" ||
                formaPagamento === "debito") && (
                <PaymentForm
                  formaPagamento={formaPagamento}
                  formData={formData}
                  handleChange={handleChange}
                />
              )}
              {formaPagamento === "boleto" && (
                <PaymentForm
                  formaPagamento={formaPagamento}
                  formData={formData}
                  handleChange={handleChange}
                />
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
