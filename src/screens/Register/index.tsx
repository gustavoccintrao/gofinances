import React, { useState } from "react";
import { Modal } from "react-native";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { Input } from "../../components/Form/Input";
import { TransactionTypeButton } from "../../components/Form/TransactionTypeButton";
import { CategorySelect } from "../CategorySelect";

import {
  Container,
  Header,
  Title,
  Form,
  Fields,
  TransactionTypes,
} from "./styles";

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [category, setCategory] = useState({
    key: 'category',
    name: 'Categoria'
  });

  function handleSetTransactionsTypeSelect(type: "income" | "outcome") {
    if (type === transactionType) {
      setTransactionType("");
      return;
    }
    setTransactionType(type);
  }

  function handleOpenCategoryModal() {
    setShowCategoryModal(true);
  }
  
  function handleCloseCategoryModal() {
    setShowCategoryModal(false);
  }
  return (
    <Container>
      <Header>
        <Title>Cadastro</Title>
      </Header>
      <Form>
        <Fields>
          <Input placeholder="Nome" />
          <Input placeholder="Preço" />
          <TransactionTypes>
            <TransactionTypeButton
              title="Income"
              type="income"
              onPress={() => handleSetTransactionsTypeSelect("income")}
              isActive={transactionType === "income"}
            />
            <TransactionTypeButton
              title="Outcome"
              type="outcome"
              onPress={() => handleSetTransactionsTypeSelect("outcome")}
              isActive={transactionType === "outcome"}
            />
          </TransactionTypes>

          <CategorySelectButton title={category.name} onPress={handleOpenCategoryModal}/>
        </Fields>

        <Button title="Enviar" />
      </Form>
      <Modal visible={showCategoryModal}>
        <CategorySelect 
          category={category}
          setCategory={setCategory}
          closeSelectCategory={handleCloseCategoryModal}
        />
      </Modal>
    </Container>
  );
}
