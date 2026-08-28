import './home.css';
import {useNavigate} from 'react-router-dom';

function Home() {
    const navigate = useNavigate();

    return (
        <div className="Home">
            <header className="headerHome">

                <a href="/">
                    <img src="src/pages/images/logo.png" alt="Logo" />
                </a>
                <h1>
                    <span>Ats</span>Check
                </h1>
                <div className="butoes">
                    <button className="analyzeCV" onClick={() => navigate('/PdfAnalyzer')}>Analisar CV</button>
                    <button className="analyzeJob" onClick={() => navigate('/JobAnalyzer')}>Analisar CV e Vaga</button>
                </div>

            </header>

            <div className="container">
                    <div className="content">
                        <h2>Passe no filtro dos recrutadores antes mesmo da entrevista</h2>
                        <p>
                            O <strong>AtsCheck</strong> é uma ferramenta inovadora para analisar currículos e vagas de emprego com rapidez e eficiência.
                            Com nossa tecnologia avançada, você pode:
                        </p>
                        <p>
                             ✓ Identificar pontos fortes e áreas de melhoria no seu currículo.
                        </p>
                        <p>
                             ✓ Comparar seu perfil com os requisitos das vagas desejadas.
                        </p>
                        <p>
                            Nosso objetivo é destacar candidatos no mercado de trabalho, fornecendo <em>insights</em> valiosos para aumentar suas chances de sucesso profissional.
                        </p>

                        <button className="Comecar" onClick={() => (window.location.href= "/PdfAnalyzer")}>Começar agora</button>
                    </div>
                <img className="contImage" src="src/pages/images/HomeImage.svg" alt="Logo" />
            </div>
        </div>
    );
}

export default Home;
