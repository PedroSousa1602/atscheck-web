import { useState} from 'react';
import api from './services/Api';
import './PdfAnalyze.css';

function PdfAnalyzer() {
    const [analyzed, setAnalyzed] = useState(false);
    const [file, setFile] = useState(null);

    const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
        setFile(e.target.files[0]);
        }
    };

    const handleFileUpload = async (e) => {

        e.preventDefault();
        
        if(!file) {
            console.error('Nenhum ficheiro selecionado.');
            return;
        }

        const formData = new FormData();
        formData.append('file', file);

        try {
            const response = await api.post('/analyzeCv', formData);
            console.log('Análise concluída:', response.data);
            console.log(file);
            setAnalyzed(true);
        } catch (error) {
            console.error('Erro ao analisar o CV:', error);
        }
    }

    return (
        <div className="page-wrapper">
            <header className="headerHome">
                <a href="/">
                    <img src="src/pages/images/logo.png" alt="Logo" />
                </a>
                <h1>Ats<span>Check</span></h1>

                <div className="butoes">
                    <button className="btn-nav">Analisar CV</button>
                    <button className="btn-nav">Analisar CV e Vaga</button>
                </div>
            </header>

            <main className="container">

                <section className="upload-section">
                    <form className="upload-card" onSubmit={handleFileUpload} >
                        <h2>Carregar CV</h2>
                        <p className="upload-subtitle">Selecione o seu currículo em formato PDF para começar a análise.</p>

                        <label className="file-dropzone">
                            <input type="file" accept=".pdf" onChange={handleFileChange} />
                            <span className="dropzone-text">Clique aqui ou arraste o ficheiro .PDF</span>
                        </label>

                        <button type="submit" className="btn-submit">Analisar Currículo</button>
                    </form>
                </section>

                {/* COLUNA DA DIREITA: Score + Sugestões */}
                <section className="results-section">
                    {analyzed ? (
                        <div className="results-card">
                            <div className="score-header">
                                <div>
                                    <h3>Compatibilidade ATS</h3>
                                    <p className="score-subtitle">Resultado da análise automática</p>
                                </div>
                                <div className="score-badge">85%</div>
                            </div>

                            <div className="suggestions-body">
                                <h4>Pontos de Melhoria:</h4>
                                <ul className="suggestions-list">
                                    <li className="success">✓ Formato de ficheiro PDF estruturado corretamente.</li>
                                    <li className="warning">⚠️ Adicione mais palavras-chave da sua área na secção de experiência.</li>
                                    <li className="warning">⚠️ Evite utilizar tabelas de múltiplas colunas dentro do documento.</li>
                                </ul>
                            </div>
                        </div>
                    ) : (
                        <div className="results-card placeholder">
                            <p>Envie o seu CV no formulário ao lado para ver aqui o **Score de Compatibilidade** e as **Sugestões de Otimização**.</p>
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
}

export default PdfAnalyzer;