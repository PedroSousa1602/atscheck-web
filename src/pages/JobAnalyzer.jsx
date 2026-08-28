import './job.css';

function Analyzer() {
    return (
        <div className="Analyzer">
            <header className="headerHome">

                <a href="/">
                    <img src="src/pages/images/logo.png" alt="Logo" />
                </a>
                <h1>
                    <span>Ats</span>Check
                </h1>
                <div className="butoes">
                    <button className="analyzeCV" onClick={() => (window.location.href = '/PdfAnalyzer.jsx')}>Analisar CV</button>
                    <button className="analyzeJob" onClick={() => (window.location.href = '/JobAnalyzer.jsx')}>Analisar CV e Vaga</button>
                </div>

            </header>
        </div>
    );
}

export default Analyzer;
