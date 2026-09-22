import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
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
  const location = useLocation();
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

  const handleNavClick = (
    e: React.MouseEvent<HTMLAnchorElement>,
    to: string,
    sectionName: string
  ) => {
    e.preventDefault();
    trackNavigation(sectionName);
    closeMenu();

    if (to.startsWith("/#")) {
      const hash = to.substring(1);
      if (window.location.pathname === "/") {
        const element = document.querySelector(hash);
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
          return;
        }
      }
    }
    navigate(to);
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
        <LogoImg src="/beasier-1-1-1@2x.png" alt="Logo Gestão Boa" width="36" height="36" />
        <Title>Gestão Boa</Title>
      </Logo>{" "}
      <Links>
        <LinkItem
          href="/#start"
          title="Ir para início"
          $active={location.pathname === "/" && !location.hash}
          data-to-scrollspy-id="start"
          onClick={(e) => handleNavClick(e, "/#start", "inicio")}
        >
          INÍCIO
        </LinkItem>
        <LinkItem
          href="/solucao"
          title="Ver nossas soluções"
          $active={location.pathname === "/solucao"}
          data-to-scrollspy-id="solution"
          onClick={(e) => handleNavClick(e, "/solucao", "solucao")}
        >
          SOLUÇÃO
        </LinkItem>
        <LinkItem
          href="/preco"
          title="Ver nossos planos"
          $active={location.pathname === "/preco"}
          className="pricing"
          onClick={(e) => handleNavClick(e, "/preco", "Planos")}
        >
          PLANOS
        </LinkItem>
        <LinkItem
          href="/influenciador"
          title="Seja um afiliado Gestão Boa"
          $active={location.pathname === "/influenciador"}
          onClick={(e) => handleNavClick(e, "/influenciador", "afiliado")}
        >
          SEJA UM AFILIADO
        </LinkItem>
        <LinkItem
          href="/sobre"
          title="Conheça nossa equipe"
          $active={location.pathname === "/sobre"}
          data-to-scrollspy-id="team"
          onClick={(e) => handleNavClick(e, "/sobre", "sobre")}
        >
          SOBRE NÓS
        </LinkItem>
        <LinkItem
          href="/#contact"
          title="Entre em contato"
          $active={location.hash === "#contact"}
          data-to-scrollspy-id="contact"
          onClick={(e) => handleNavClick(e, "/#contact", "contato")}
        >
          CONTATO
        </LinkItem>
      </Links>
      <MenuButton
        onClick={toggleMenu}
        isOpen={isMenuOpen}
        aria-label={isMenuOpen ? "Fechar menu" : "Abrir menu"}
        aria-expanded={isMenuOpen}
      >
        <span></span>
        <span></span>
        <span></span>
      </MenuButton>{" "}
      <MobileLinks isOpen={isMenuOpen} onClick={(e) => e.stopPropagation()}>
        <LinkItem
          href="/#start"
          title="Ir para início"
          $active={location.pathname === "/" && !location.hash}
          onClick={(e) => handleNavClick(e, "/#start", "inicio")}
        >
          INÍCIO
        </LinkItem>
        <LinkItem
          href="/solucao"
          title="Ver nossas soluções"
          $active={location.pathname === "/solucao"}
          onClick={(e) => handleNavClick(e, "/solucao", "solucao")}
        >
          SOLUÇÃO
        </LinkItem>
        <LinkItem
          href="/preco"
          title="Ver nossos planos"
          $active={location.pathname === "/preco"}
          className="pricing"
          onClick={(e) => handleNavClick(e, "/preco", "Planos")}
        >
          PLANOS
        </LinkItem>
        <LinkItem
          href="/influenciador"
          title="Seja um afiliado Gestão Boa"
          $active={location.pathname === "/influenciador"}
          onClick={(e) => handleNavClick(e, "/influenciador", "afiliado")}
        >
          SEJA UM AFILIADO
        </LinkItem>
        <LinkItem
          href="/sobre"
          title="Conheça nossa equipe"
          $active={location.pathname === "/sobre"}
          onClick={(e) => handleNavClick(e, "/sobre", "sobre")}
        >
          SOBRE NÓS
        </LinkItem>
        <LinkItem
          href="/#contact"
          title="Entre em contato"
          $active={location.hash === "#contact"}
          onClick={(e) => handleNavClick(e, "/#contact", "contato")}
        >
          CONTATO
        </LinkItem>{" "}
        <ButtonLink
          href="/criar-conta"
          title="Testar o Gestão Boa agora"
          onClick={(e) => {
            e.preventDefault();
            FB_PIXEL.trackCustomEvent("TestNowClick", {
              location: "mobile_menu",
            });
            closeMenu();
            navigate("/criar-conta");
          }}
        >
          <Button
            width="100%"
            text="TESTAR GRÁTIS"
            method={() => {}}
            type="focused"
            style={{
              paddingTop: "10px",
              paddingBottom: "10px",
              fontSize: "0.9rem",
              borderRadius: "8px",
            }}
          />
        </ButtonLink>
      </MobileLinks>{" "}
      <TestNow>
        <ButtonLink
          href="/criar-conta"
          title="Testar o Gestão Boa agora"
          onClick={(e) => {
            e.preventDefault();
            FB_PIXEL.trackCustomEvent("TestNowClick", { location: "header" });
            navigate("/criar-conta");
          }}
        >
          <Button
            width="140px"
            text="TESTAR GRÁTIS"
            method={() => {}}
            type="focused"
            style={{
              paddingTop: "8px",
              paddingBottom: "8px",
              fontSize: "0.8rem",
              borderRadius: "6px",
            }}
          />
        </ButtonLink>
      </TestNow>
    </Container>
  );
}
