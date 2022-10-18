import React, { useState } from "react";
import { Alert, Modal, TouchableWithoutFeedback, Keyboard } from "react-native";
import * as Yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AsyncStorage from "@react-native-async-storage/async-storage";
import uuid from "react-native-uuid";

import { useForm } from "react-hook-form";
import { useNavigation } from "@react-navigation/native";
import { BottomTabNavigationProp } from "@react-navigation/bottom-tabs";
import { AppRoutesParamList } from "../../routes/app.routes";

import { Button } from "../../components/Form/Button";
import { CategorySelectButton } from "../../components/Form/CategorySelectButton";
import { InputForm } from "../../components/Form/InputForm";
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

const formSchema = Yup.object().shape({
  name: Yup.string().required("Nome é obrigatório!"),
  amount: Yup.number()
    .typeError("Informe um valor numérico!")
    .positive("O valor não pode ser negativo!")
    .required("O valor é obrigatório!"),
});

const dataKey = "@gofinances:transactions";
interface FormData {
  [key: string]: any;
}

type RegisterNavigationProps = BottomTabNavigationProp<
  AppRoutesParamList,
  "Cadastrar"
>;

export function Register() {
  const [transactionType, setTransactionType] = useState("");
  const [showCategoryModal, setShowCategoryModal] = useState(false);
  const [category, setCategory] = useState({
    key: "category",
    name: "Categoria",
  });

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(formSchema),
  });

  const Navigation = useNavigation<RegisterNavigationProps>();

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

  function clearState() {
    reset();
    setTransactionType("");
    setCategory({
      key: "category",
      name: "categoria",
    });
  }

  async function handleRegister(form: FormData) {
    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação!");
    }

    if (category.key === "category") {
      return Alert.alert("Selecione a categoria!");
    }

    if (!transactionType) {
      return Alert.alert("Selecione o tipo de transação!");
    }
    const newTransaction = {
      id: String(uuid.v4()),
      name: form.name,
      amount: form.amount,
      type: transactionType,
      category: category.key,
      date: new Date(),
    };

    try {
      const data = await AsyncStorage.getItem(dataKey);
      const currentData = data ? JSON.parse(data) : [];

      const formattedData = [...currentData, newTransaction];

      await AsyncStorage.setItem(dataKey, JSON.stringify(formattedData));

      clearState();
      Navigation.navigate("Listagem");
    } catch (error) {
      console.log(">>> HandleRegisterError: ", error);
      Alert.alert("Não foi possível salvar a transação!");
    }
  }
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <Container>
        <Header>
          <Title>Cadastro</Title>
        </Header>
        <Form>
          <Fields>
            <InputForm
              name="name"
              control={control}
              placeholder="Nome"
              autoCapitalize="sentences"
              autoCorrect={false}
              error={errors.name?.message}
            />

            <InputForm
              name="amount"
              control={control}
              placeholder="Preço"
              keyboardType="numeric"
              error={errors.amount?.message}
            />
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

            <CategorySelectButton
              title={category.name}
              onPress={handleOpenCategoryModal}
            />
          </Fields>

          <Button title="Enviar" onPress={handleSubmit(handleRegister)} />
        </Form>
        <Modal visible={showCategoryModal}>
          <CategorySelect
            category={category}
            setCategory={setCategory}
            closeSelectCategory={handleCloseCategoryModal}
          />
        </Modal>
      </Container>
    </TouchableWithoutFeedback>
  );
}
