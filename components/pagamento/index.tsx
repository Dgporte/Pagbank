interface PaymentFormProps {
  formaPagamento: string;
  formData: {
    card: {
      number: string;
      exp_month: string;
      exp_year: string;
      security_code: string;
      installments: number;
    };
    boleto: {
      due_date: string; // Usando string para data, pois pode ser manipulada diretamente
      instruction_lines: {
        line_1: string;
        line_2: string;
      };
    };
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const PaymentForm: React.FC<PaymentFormProps> = ({
  formaPagamento,
  formData,
  handleChange,
}) => {
  if (
    formaPagamento === "cartao" ||
    formaPagamento === "cartaoCredito" ||
    formaPagamento === "debito"
  ) {
    return (
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

        <label htmlFor="card.security_code">Código de Segurança</label>
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
    );
  }

  if (formaPagamento === "boleto") {
    return (
      <div>
        <h3>Dados do Boleto</h3>
        <label htmlFor="boleto.due_date">Data de Vencimento</label>
        <input
          type="date"
          id="boleto.due_date"
          name="boleto.due_date"
          value={formData.boleto.due_date || "2025-01-25"} // Valor padrão
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
          value={
            formData.boleto.instruction_lines.line_1 ||
            "Favor efetuar o pagamento até a data de vencimento."
          } // Valor padrão
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
          value={
            formData.boleto.instruction_lines.line_2 ||
            "Após o vencimento, acrescerão juros e multa."
          } // Valor padrão
          onChange={handleChange}
          placeholder="Digite a linha de instrução 2"
          required
        />
      </div>
    );
  }

  return null; // Se a forma de pagamento não for "cartao" nem "boleto", não renderiza nada
};

export default PaymentForm;
