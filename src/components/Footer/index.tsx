import { Link } from "react-router-dom";
import { Container } from "./styles";

export default function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <Container>
            <div className="link">
                <Link to="/terms">Termos de uso</Link>
                <Link to="/privacy">Política de privacidade</Link>
                <Link to="/regulamento-indicacao">Regulamento de indicação</Link>
            </div>
            <div className="logo">
                <Link to="/" className="logo-link">
                    <img src="/beasier-1-1-1@2x.png" alt="Logo Gestão Boa" width="50" height="50" />
                    <div>Gestão Boa</div>
                </Link>
            </div>
            <div className="link-mobile">
                <Link to="/terms">Termos de uso</Link>
                <Link to="/privacy">Política de privacidade</Link>
                <Link to="/regulamento-indicacao">Regulamento de indicação</Link>
            </div>
            <div className="copyright">
                <div>Razão Social: BEASIER INOVA SIMPLES (I.S.)</div>
                <div>CNPJ: 53.909.852/0001-62</div>
                <div>© {currentYear} Gestão Boa. Todos os direitos reservados.</div>
            </div>
        </Container>
    );
}