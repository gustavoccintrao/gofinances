import React from "react";
import { RFValue } from "react-native-responsive-fontsize";

import AppleLogo from "../../assets/apple.svg";
import GoogleLogo from "../../assets/google.svg";
import Logo from "../../assets/logo.svg";
import { SignInSocialButton } from "../../components/SignInSocialButton";
import { useAuth } from "../../hooks/auth";

import {
  Container,
  Header,
  TitleWrapper,
  Title,
  SignInTitle,
  Footer,
  FooterWrapper,
} from "./styles";

export function SignIn() {
  const { user } = useAuth();

  console.log(user.email);
  
  return (
    <Container>
      <Header>
        <TitleWrapper>
          <Logo width={RFValue(120)} height={RFValue(68)} />

          <Title>
            Controle suas {"\n"}
            finanças de forma {"\n"}
            muito simples
          </Title>
        </TitleWrapper>
        <SignInTitle>
          Faça seu login com {"\n"}
          uma das contas abaixo
        </SignInTitle>
      </Header>

      <Footer>
        <FooterWrapper>
          <SignInSocialButton title="Entrar com Google" svg={GoogleLogo} />
          <SignInSocialButton title="Entrar com Apple" svg={AppleLogo} />
        </FooterWrapper>
      </Footer>
    </Container>
  );
}
