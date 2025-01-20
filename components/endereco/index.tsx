import React from "react";
import InputField from "../input";

interface AddressFormProps {
  formData: {
    street: string;
    number: string;
    complement?: string;
    locality: string;
    city: string;
    region_code: string;
    country: string;
    postal_code: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

const AddressForm: React.FC<AddressFormProps> = ({
  formData,
  handleChange,
}) => (
  <div>
    <h3>Endereço</h3>
    <InputField
      label="Rua"
      id="street"
      name="street"
      value={formData.street}
      onChange={handleChange}
      placeholder="Digite a rua"
      required
    />
    <InputField
      label="Número"
      id="number"
      name="number"
      value={formData.number}
      onChange={handleChange}
      placeholder="Digite o número"
      required
    />
    <InputField
      label="Complemento"
      id="complement"
      name="complement"
      value={formData.complement || ""}
      onChange={handleChange}
      placeholder="Digite o complemento"
    />
    <InputField
      label="Bairro"
      id="locality"
      name="locality"
      value={formData.locality}
      onChange={handleChange}
      placeholder="Digite o bairro"
      required
    />
    <InputField
      label="Cidade"
      id="city"
      name="city"
      value={formData.city}
      onChange={handleChange}
      placeholder="Digite a cidade"
      required
    />
    <InputField
      label="Código do Estado"
      id="region_code"
      name="region_code"
      value={formData.region_code}
      onChange={handleChange}
      placeholder="Digite o código do estado"
      required
    />
    <InputField
      label="País"
      id="country"
      name="country"
      value={formData.country}
      onChange={handleChange}
      placeholder="Digite o país"
      required
    />
    <InputField
      label="CEP"
      id="postal_code"
      name="postal_code"
      value={formData.postal_code}
      onChange={handleChange}
      placeholder="Digite o CEP"
      required
    />
  </div>
);

export default AddressForm;
