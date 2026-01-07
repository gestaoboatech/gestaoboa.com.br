import { Container } from "./styles.ts"

type props = {}

export default function Footer({ }: props) {
    return (
        <Container>
            <div className="link">
                <a href="/terms">Termos de uso</a>
                {/* <a href="/privacy">Politica de privacidade</a> */}
            </div>
            <div className="logo">
                <img src="/beasier-1-1-1@2x.png" alt="" />
                <div>Gestão Boa</div>
            </div>
            <div className="link-mobile">
                <a href="/terms">Termos de uso</a>
                {/* <a href="/privacy">Politica de privacidade</a> */}
            </div>
            <div className="copyright">
                <div>Razão Social: BEASIER INOVA SIMPLES (I.S.)</div>
                <div>CNPJ: 53.909.852/0001-62</div>
                <div>Gestão Boa@ todos direitos reservados</div>
            </div>
        </Container>
    )
}