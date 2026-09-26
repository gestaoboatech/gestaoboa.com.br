import { FunctionComponent } from "react";
import { Helmet } from "react-helmet-async";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Container, Main, ContentCard, LastUpdated } from "../Terms/styles";

const RegulamentoIndicacao: FunctionComponent = () => {
  return (
    <Container>
      <Helmet>
        <title>Regulamento do Programa de Indicação | Gestão Boa</title>
        <meta
          name="description"
          content="Regulamento oficial do Programa de Indicação do Gestão Boa. Conheça as regras, condições e benefícios."
        />
        <link rel="canonical" href="https://gestaoboa.com.br/regulamento-indicacao" />
      </Helmet>
      <Header />
      <Main>
        <ContentCard>
          <h1>REGULAMENTO DO PROGRAMA DE INDICAÇÃO</h1>
          <LastUpdated>Versão 1.0 — vigente a partir de 01/09/2026</LastUpdated>

          <p>
            BEASIER INOVA SIMPLES (I.S.), inscrita no CNPJ nº 53.909.852/0001-62, com sede em Rio Grande/RS, doravante denominada &quot;Empresa&quot;, institui o presente Programa de Indicação, regido pelas condições abaixo.
          </p>

          <h2>1. Objeto</h2>
          <p>
            O Programa de Indicação permite que participantes indiquem novos clientes para o sistema de gestão da Empresa. Cada indicação que resultar em uma nova assinatura gera, ao participante que a realizou, um desconto de 10% (dez por cento) sobre o valor da sua própria mensalidade, nos termos deste Regulamento.
          </p>

          <h2>2. Quem pode indicar</h2>
          <p>
            Pode participar e realizar indicações qualquer educador da área da beleza, seja ou não assinante do sistema da Empresa.
          </p>
          <p>
            <strong>Importante:</strong> o benefício deste Programa é um desconto sobre a mensalidade. Portanto, o desconto de 10% somente produz efeito para o participante que possua assinatura ativa do sistema. Participantes sem assinatura ativa podem realizar indicações, mas não farão jus ao desconto enquanto não houver mensalidade sobre a qual aplicá-lo.
          </p>

          <h2>3. Como funciona a indicação</h2>
          <p>
            3.1. Cada participante recebe um link de indicação exclusivo.
          </p>
          <p>
            3.2. A indicação é feita exclusivamente por meio desse link, através do qual o interessado (indicado) realiza seu próprio cadastro, fornecendo diretamente seus dados. O participante que indica não insere dados de terceiros.
          </p>
          <p>
            3.3. O tratamento dos dados pessoais coletados observa a Lei nº 13.709/2018 (LGPD) e a Política de Privacidade da Empresa.
          </p>

          <h2>4. Prazo para conversão da indicação</h2>
          <p>
            O interessado indicado tem o prazo de 30 (trinta) dias, contados da data da indicação (cadastro via link), para contratar um plano. Contratações fora desse prazo não geram direito ao desconto.
          </p>

          <h2>5. Concessão do desconto</h2>
          <p>
            5.1. O desconto de 10% é concedido ao participante imediatamente após a assinatura do contrato pelo indicado, dentro do prazo previsto na cláusula 4.
          </p>
          <p>
            5.2. O desconto incide sobre a mensalidade do participante e vigora por prazo indeterminado, enquanto vigente este Programa e mantida a assinatura ativa do participante.
          </p>

          <h2>6. Não cumulatividade</h2>
          <p>
            O participante mantém um único desconto de 10%, não cumulativo, independentemente do número de indicações convertidas. Novas indicações convertidas não somam percentuais adicionais ao desconto já vigente.
          </p>

          <h2>7. Vigência, alteração e encerramento do Programa</h2>
          <p>
            7.1. Este Programa vigora por prazo indeterminado.
          </p>
          <p>
            7.2. A Empresa poderá alterar ou encerrar o Programa a qualquer momento, mediante aviso prévio de 30 (trinta) dias aos participantes que estiverem recebendo o desconto.
          </p>
          <p>
            7.3. O encerramento do Programa interrompe a aceitação de novas indicações, mas preserva os descontos já adquiridos pelos participantes até então, na forma em que foram concedidos.
          </p>

          <h2>8. Aceite</h2>
          <p>
            A participação no Programa implica a aceitação integral deste Regulamento. O aceite é registrado eletronicamente pela Empresa, com identificação da conta do participante, data e hora, versão do Regulamento aceita e demais dados técnicos do registro.
          </p>

          <h2>9. Disposições gerais</h2>
          <p>
            9.1. Este Programa não constitui esquema de marketing multinível: cada participante é recompensado exclusivamente por sua indicação direta convertida, sem qualquer ganho sobre indicações realizadas por terceiros.
          </p>
          <p>
            9.2. A Empresa poderá cancelar benefícios obtidos mediante fraude, uso indevido do link ou violação deste Regulamento.
          </p>
          <p>
            9.3. Casos omissos serão resolvidos pela Empresa.
          </p>
        </ContentCard>
      </Main>
      <Footer />
    </Container>
  );
};

export default RegulamentoIndicacao;
