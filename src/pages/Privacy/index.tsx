import { FunctionComponent } from "react";
import { 
  Container, 
  Main, 
  ContentCard, 
  Section, 
  LastUpdated
} from "../Terms/styles";
// We can define RightsList locally if it's specific to Privacy
import styled from "styled-components";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import { Helmet } from "react-helmet-async";

const RightsList = styled.ul`
  list-style: none;
  padding: 0 !important;
  margin: 24px 0;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 16px;

  li {
    background: #f8f9fa;
    padding: 16px 20px;
    border-radius: 12px;
    font-weight: 500;
    color: #2d3436;
    display: flex;
    align-items: center;
    transition: transform 0.2s, background 0.2s;
    margin-bottom: 0 !important;

    &:hover {
      transform: translateY(-2px);
      background: #e9ecef;
    }

    &::before {
      content: "✓";
      margin-right: 12px;
      color: #00b894;
      font-weight: bold;
    }
  }
`;

const ContactBox = styled.div`
  background: #f8f9fa;
  border: 1px solid #e9ecef;
  padding: 32px;
  border-radius: 16px;
  margin-top: 40px;
  text-align: center;

  p {
    margin-bottom: 8px !important;
  }

  a {
    color: #00b894;
    text-decoration: none;
    font-weight: 700;
    font-size: 1.2rem;
    display: inline-block;
    transition: all 0.2s;

    &:hover {
      opacity: 0.8;
      text-decoration: underline;
    }
  }
`;

const Privacy: FunctionComponent = () => {
	return (
		<Container>
			<Helmet>
				<title>Política de Privacidade | Gestão Boa</title>
				<meta name="description" content="Esta Política de Privacidade explica como coletamos, processamos e protegemos suas informações no Gestão Boa." />
				<link rel="canonical" href="/privacy" />
			</Helmet>
			
			<Header />
			<Main>
				<ContentCard>
          <h1>Política de Privacidade</h1>
          <LastUpdated>Última atualização: Julho de 2024</LastUpdated>

					<Section>
						<p>
							O site Gestão Boa é de propriedade da empresa Gestão Boa, que é a
							controladora de seus dados pessoais.
						</p>
						<p>
							Nós adotamos esta Política de Privacidade, que determina como nós
							estamos processando as informações coletadas pelo site Gestão Boa e
							também explica por quais razões nós precisamos coletar dados
							pessoais sobre você. Portanto, você deve ler esta Política de
							Privacidade antes de usar o site Gestão Boa.
						</p>
						<p>
							Nós cuidamos dos seus dados pessoais e assumimos a responsabilidade
							de garantir a confidencialidade e segurança de suas informações
							pessoais.
						</p>
					</Section>

					<Section>
						<h2>Informações pessoais que coletamos</h2>
						<p>
							Quando você visita o site Gestão Boa, nós automaticamente coletamos
							certas informações sobre seu dispositivo, incluindo informações sobre
							seu navegador, endereço IP, fuso horário e alguns dos cookies
							instalados no seu dispositivo. 
						</p>
						<p>
							Além disso, quando você navega pelo Site, nós coletamos informações sobre as páginas individuais ou
							produtos que você visualiza, sobre quais sites ou termos de busca
							redirecionar você para nosso Site, e sobre como você interage com o
							Site. Nós nos referimos a essas informações coletadas automaticamente
							como "Informações sobre o dispositivo". 
						</p>
						<p>
							Além disso, nós podemos coletar dados pessoais que você fornecer (incluindo, mas não limitado
							a: Nome, Sobrenome, Endereço, informações de pagamento, etc) durante o
							processo de registro para poder cumprir o acordo.
						</p>
					</Section>

					<Section>
						<h2>Por que processamos seus dados?</h2>
						<p>
							Nossa maior prioridade é a segurança dos dados pessoais dos usuários
							e, portanto, nós podemos processar apenas dados mínimos, apenas
							enquanto for absolutamente necessário para a manutenção do site.
							Informações coletadas automaticamente são usadas para identificar
							possíveis casos de abuso e estabelecer dados estatísticos sobre o
							uso do site. Esses dados estatísticos não são agregados de outras
							formas que permitam a identificação de usuários específicos do
							sistema.
						</p>
						<p>
							Você pode visitar o site sem nos contar sobre quem você é ou revelar
							qualquer informação que possa ser usada por outra pessoa para
							identificar você individualmente. Se, apesar disso, você quiser
							utilizar algum dos recursos do site, ou quiser receber nossa
							newsletter, ou quiser conceder outros detalhes através do
							preenchimento e envio de formulários, você poderá fornecer dados
							pessoais para nós, como seu email, nome, sobrenome, cidade de
							residência, organização e número de telefone. 
						</p>
						<p>
							Você pode escolher não fornecer dados pessoais para nós, mas, dessa forma, talvez você não
							consiga usar alguns dos recursos do site. Por exemplo, você não vai
							conseguir receber nossa Newsletter ou entrar em contato conosco
							diretamente pelo nosso site. Usuários que não tenham certeza sobre
							quais informações pessoais são obrigatórias são convidados a
							entrarem em contato conosco pelo e-mail BEasier.IG@gmail.com.
						</p>
					</Section>

					<Section>
						<h2>Seus direitos</h2>
						<p>
							Se você morar na Europa (GDPR) ou Brasil (LGPD), estes são os direitos garantidos quanto aos
							seus dados pessoais:
						</p>
						<RightsList>
							<li>O direito de ser informado</li>
							<li>O direito ao acesso</li>
							<li>O direito à retificação</li>
							<li>O direito de deletar (Esquecimento)</li>
							<li>O direito de restringir o processamento</li>
							<li>O direito da portabilidade de dados</li>
							<li>O direito à objeção</li>
							<li>Direitos em relação a decisões automáticas</li>
						</RightsList>
						<p>
							Se você quiser exercitar esses direitos, por favor entre em contato
							conosco usando os dados de contato abaixo.
						</p>
						<p>
							Adicionalmente, se você mora na Europa, nós afirmamos que estamos
							processando suas informações com a finalidade de cumprir contratos
							que possamos ter firmado com você (por exemplo, se você fizer uma
							compra no nosso Site), ou para exercer os interesses legítimos da
							nossa empresa listados acima. Além disso, por favor saiba que suas
							informações podem ser transferidas para fora da Europa, incluindo
							para o Canadá e os Estados Unidos da América.
						</p>
					</Section>

					<Section>
						<h2>Links para outros sites</h2>
						<p>
							Nosso site pode conter links para outros sites que não são
							controlados por nós e/ou não são de nossa propriedade. Por favor,
							esteja ciente de que nós não somos responsáveis pelas políticas de
							privacidade de tais sites e organizações terceiras. Nós incentivamos
							você a ler a política de privacidade de cada um dos
							sites que podem coletar suas informações pessoais.
						</p>
					</Section>

					<Section>
						<h2>Segurança das informações</h2>
						<p>
							Nós garantimos que as informações que você fornece estão em servidores
							e computadores armazenados em ambientes seguros e controlados,
							protegidos de acessos, usos e divulgações não-autorizadas. Nós
							mantemos medidas de segurança administrativas, técnicas e físicas
							razoáveis, com finalidade de proteger os dados pessoais sob nossa
							custódia de acessos, usos, modificações e divulgações não-autorizadas.
						</p>
					</Section>

					<Section>
						<h2>Declaração legal</h2>
						<p>
							Nós vamos divulgar qualquer informação que coletarmos, usarmos ou
							recebermos caso tal divulgação seja solicitada ou permitida por lei,
							de forma a cumprir intimações ou processos judiciais similares, e
							também quando considerarmos em boa fé que a divulgação é necessária
							para a proteção de nossos direitos, para a proteção da segurança de
							outros, ou para responder a uma solicitação do governo.
						</p>
					</Section>

          <h2>Informações de contato</h2>
					<ContactBox>
						<p>Se você quiser saber mais sobre esta Política de Privacidade ou sobre seus direitos, entre em contato:</p>
						<a href="mailto:BEasier.IG@gmail.com">BEasier.IG@gmail.com</a>
					</ContactBox>
				</ContentCard>
			</Main>
			<Footer />
		</Container>
	);
};

export default Privacy;
