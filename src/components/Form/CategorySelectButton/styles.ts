import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";
import { RectButton } from "react-native-gesture-handler";
import { RFValue } from "react-native-responsive-fontsize";

export const Container = styled(RectButton).attrs({
    activeOpacity : 0.7
})`
  width: 100%;
  padding: 16px 18px;

  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};

  border-radius: 5px;
  background-color: ${({ theme }) => theme.colors.shape};
`;

export const Category = styled.Text`
  font-size: ${RFValue(14)}px;
  font-family: ${({ theme }) => theme.fonts.regular};
  
  color: ${({ theme }) => theme.colors.text};
  `;

export const Icon = styled(Feather)`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${RFValue(20)}px;
`;
