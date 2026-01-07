import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FB_PIXEL } from "../../utils/pixel";
import Button from "../Button";
import {
  ButtonLink,
  Container,
  LinkItem,
  Links,
  Logo,
  LogoImg,
  MenuButton,
  MobileLinks,
  TestNow,
  Title,
} from "./styles";

export default function Header() {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  const trackNavigation = (section: string) => {
    FB_PIXEL.trackCustomEvent("NavigationClick", {
      section: section,
      page: "header",
    });
    closeMenu();
  };

  return (
    <Container
      isMenuOpen={isMenuOpen}
      onClick={(e) => {
        if (
          e.target === e.currentTarget ||
          (e.target as HTMLElement).tagName === "A"
        ) {
          closeMenu();
        }
      }}
    >
      <Logo onClick={() => navigate("/")}>
        <LogoImg src="/beasier-1-1-1@2x.png" alt="logo beasier" />
        <Title>Gestão Boa</Title>
      </Logo>{" "}
      <Links>
        <LinkItem
          href="/#start"
          title="Ir para início"
          data-to-scrollspy-id="start"
          onClick={() => trackNavigation("inicio")}
        >
          INÍCIO
        </LinkItem>
        <LinkItem
          href="/solucao"
          title="Ver nossas soluções"
          data-to-scrollspy-id="solution"
          onClick={() => trackNavigation("solucao")}
        >
          SOLUÇÃO
        </LinkItem>
        <LinkItem
          href="/preco"
          title="Ver nossos planos"
          className="pricing"
          onClick={() => trackNavigation("Planos")}
        >
          PLANOS
        </LinkItem>
        <LinkItem
          href="/sobre"
          title="Conheça nossa equipe"
          data-to-scrollspy-id="team"
          onClick={() => trackNavigation("sobre")}
        >
          SOBRE NÓS
        </LinkItem>
        <LinkItem
          href="/#contact"
          title="Entre em contato"
          data-to-scrollspy-id="contact"
          onClick={() => trackNavigation("contato")}
        >
          CONTATO
        </LinkItem>
      </Links>
      <MenuButton
        onClick={toggleMenu}
        isOpen={isMenuOpen}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
      >
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>{" "}
      <MobileLinks isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
        <LinkItem
          href="/#start"
          title="Ir para início"
          onClick={() => trackNavigation("inicio")}
        >
          INÍCIO
        </LinkItem>
        <LinkItem
          href="/solucao"
          title="Ver nossas soluções"
          onClick={() => trackNavigation("solucao")}
        >
          SOLUÇÃO
        </LinkItem>
        <LinkItem
          href="/preco"
          title="Ver nossos planos"
          className="pricing"
          onClick={() => trackNavigation("Planos")}
        >
          PLANOS
        </LinkItem>
        <LinkItem
          href="/sobre"
          title="Conheça nossa equipe"
          onClick={() => trackNavigation("sobre")}
        >
          SOBRE NÓS
        </LinkItem>
        <LinkItem
          href="/#contact"
          title="Entre em contato"
          onClick={() => trackNavigation("contato")}
        >
          CONTATO
        </LinkItem>{" "}
        <ButtonLink
          href="https://beasier.vercel.app"
          title="Testar o Gestão Boa agora"
          onClick={() => {
            FB_PIXEL.trackCustomEvent("TestNowClick", {
              location: "mobile_menu",
            });
            closeMenu();
          }}
        >
          <Button
            width="100%"
            text="TESTAR AGORA"
            method={() => {}}
            type="focused"
          />
        </ButtonLink>
      </MobileLinks>{" "}
      <TestNow>
        <ButtonLink
          href="https://beasier.vercel.app"
          title="Testar o Gestão Boa agora"
          onClick={() =>
            FB_PIXEL.trackCustomEvent("TestNowClick", { location: "header" })
          }
        >
          <Button
            width="200px"
            text="TESTAR GRÁTIS"
            method={() => {}}
            type="focused"
          />
        </ButtonLink>
      </TestNow>
    </Container>
  );
}
