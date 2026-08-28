import './pdfanalyze.css';
import { useNavigate } from 'react-router-dom';

function AnalyzerCV() {

    const navigate = useNavigate();

    return (
        <div className="PdfAnalyzer">
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
        </div>
    );
}

export default AnalyzerCV;
