import styles from './home.module.css'; 
import { useNavigate } from 'react-router-dom';
import logoImg from "../images/Logo.png";
import HomeImage from "../images/HomeImage.svg";

function Home() {
    const navigate = useNavigate();

    return (
        <div className={styles.Home}>
            <header className={styles.headerHome}>

                <a href="/">
                    <img src={logoImg} alt="Logo" />
                </a>
                <h1>
                    <span>Ats</span>Check
                </h1>
                <div className={styles.butoes}>
                    <button className={styles.analyzeCV} onClick={() => navigate('/PdfAnalyzer')}>Analisar CV</button>
                    <button className={styles.analyzeJob} onClick={() => navigate('/JobAnalyzer')}>Analisar CV e Vaga</button>
                </div>

            </header>

            <div className={styles.container}>
                <div className={styles.content}>
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

                    <button className={styles.Comecar} onClick={() => (window.location.href= "/PdfAnalyzer")}>Começar agora</button>
                </div>
                <img className={styles.contImage} src={HomeImage} alt="Imagem da Página Inicial" />
            </div>
        </div>
    );
}

export default Home;