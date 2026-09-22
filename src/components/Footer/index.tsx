import { Link } from "react-router-dom";
import { Container, FooterGrid, FooterCol, BottomBar } from "./styles";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Container>
            <FooterGrid>
                <FooterCol className="brand-col">
                    <Link to="/" className="logo-link">
                        <img src="/beasier-1-1-1@2x.png" alt="Logo Gestão Boa" width="46" height="46" />
                        <span>Gestão Boa</span>
                    </Link>
                    <p className="tagline">
                        A plataforma completa e intuitiva de gestão, agendamento online e automação para barbearias, salões e clínicas de estética.
                    </p>
                </FooterCol>

                <FooterCol>
                    <h4>Navegação</h4>
                    <Link to="/solucao">Soluções</Link>
                    <Link to="/preco">Planos & Preços</Link>
                    <Link to="/barbearia">Para Barbearias</Link>
                    <Link to="/salao-estetica">Para Salões & Estética</Link>
                    <Link to="/influenciador">Programa de Afiliados</Link>
                    <Link to="/sobre">Sobre a Gestão Boa</Link>
                </FooterCol>

                <FooterCol>
                    <h4>Legal & Segurança</h4>
                    <Link to="/terms">Termos de Uso</Link>
                    <Link to="/privacy">Política de Privacidade</Link>
                    <Link to="/regulamento-indicacao">Regulamento de Indicação</Link>
                    <a href="https://wa.me/5553999461550" target="_blank" rel="noopener noreferrer">
                        Suporte via WhatsApp
                    </a>
                </FooterCol>
            </FooterGrid>

            <BottomBar>
                <div className="company-info">
                    <span>Razão Social: BEASIER INOVA SIMPLES (I.S.)</span>
                    <span className="dot">•</span>
                    <span>CNPJ: 53.909.852/0001-62</span>
                </div>
                <div className="copyright-text">
                    © {currentYear} Gestão Boa. Todos os direitos reservados.
                </div>
            </BottomBar>
        </Container>
    );
}