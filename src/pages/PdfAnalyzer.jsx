import {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import api from './services/Api';
import './PdfAnalyze.css';

function PdfAnalyzer() {
    
    const navigate = useNavigate();
    const [analyzed, setAnalyzed] = useState(false);
    const [file, setFile] = useState(null);

    const [pontuacao, setPontuacao] = useState(null);
    const [resumoExecutivo, setResumoExecutivo] = useState([]);
    const [formatacaoEEstrutura, setFormatacaoEEstrutura] = useState([]);
    const [palavrasChaveFaltantes, setPalavrasChaveFaltantes] = useState(null);
    const [sugestoesMetricas, setSugestoesMetricas] = useState([]);

    const [isLoading, setIsLoading] = useState(false);

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

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        let setresponse = null;

        try {
            const response = await api.post('/analyzeCv', formData);
            console.log("Resposta recebida da API");
            let data = response.data;

            if (typeof data === 'string') {
                data = data.trim();
                if (data === '') {
                    throw new Error("Resposta veio vazia da Api.");
                }

                data = data
                    .replace(/^```json\s*/i, '') // Remove o ```json do início
                    .replace(/^```\s*/i, '')     // Remove apenas ``` se vier sem o "json"
                    .replace(/\s*```$/, '')      // Remove o ``` do fim
                    .trim();
                data = JSON.parse(data); // Converte a string para objeto JSON

            }

            let parsedData = null;

            // Se chegou aqui com sucesso e tem dados válidos, guarda o resultado
            if (data && typeof data === 'object') {
                parsedData = data;
                console.log("JSON válido recebido:", parsedData);
                setresponse = parsedData;
            }

            setAnalyzed(true);
        } catch (error) {
            console.error('Erro ao analisar o CV:', error);
        } finally {
            setIsLoading(false);
        }

        if (setresponse && typeof setresponse === 'object') {
    

            setAnalyzed(true);

            setPontuacao(setresponse.pontuacaoGeral ?? 0);
            setResumoExecutivo(setresponse.resumoExecutivo ?? '');
            setFormatacaoEEstrutura(setresponse.formatacaoEEstrutura ?? []);
            setPalavrasChaveFaltantes(setresponse.palavrasChaveFaltantes ?? null);
            setSugestoesMetricas(setresponse.sugestoesMetricas ?? []);
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
                    <button className="analyzeCV" onClick={() => navigate('/PdfAnalyzer')}>Analisar CV</button>
                    <button className="analyzeJob" onClick={() => navigate('/JobAnalyzer')}>Analisar CV e Vaga</button>
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

                                <div className="score-badge">{pontuacao}</div>
                            </div>

                            <div className="suggestions-body">
    <ul className="suggestions-list">
        {/* 1. Resumo Executivo */}
        {resumoExecutivo && (
            <li className="success">{resumoExecutivo}</li>
        )}

        <h4>Pontos de Melhoria:</h4>

        {/* 2. Problemas de Formatação e Estrutura */}
        {formatacaoEEstrutura?.map((item, index) => (
            <li key={`fmt-${index}`} className="warning">
                ⚠️ <strong>{item.problema}:</strong> {item.solucao}
            </li>
        ))}

        {/* 3. Sugestões de Métricas */}
        {sugestoesMetricas?.map((item, index) => (
            <li key={`met-${index}`} className="warning">
                💡 <strong>Trocar:</strong> "{item.passagemOriginal}" ➔ <strong>Por:</strong> "{item.exemploReescrito}"
            </li>
        ))}
    </ul>

    {/* 4. Bloco de Palavras-Chave Faltantes em Badges */}
    {palavrasChaveFaltantes && (
        <div className="keywords-section">
            <h4 className="keywords-title">PALAVRAS-CHAVE FALTANTES</h4>

            {/* Técnicas */}
            {palavrasChaveFaltantes.tecnicas?.length > 0 && (
                <div className="keyword-group">
                    <span className="keyword-label">Técnicas:</span>
                    <div className="tags-container">
                        {palavrasChaveFaltantes.tecnicas.map((item, index) => (
                            <span key={`tec-${index}`} className="tag tag-tecnica">{item}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Ferramentas */}
            {palavrasChaveFaltantes.ferramentas?.length > 0 && (
                <div className="keyword-group">
                    <span className="keyword-label">Ferramentas:</span>
                    <div className="tags-container">
                        {palavrasChaveFaltantes.ferramentas.map((item, index) => (
                            <span key={`ferr-${index}`} className="tag tag-ferramenta">{item}</span>
                        ))}
                    </div>
                </div>
            )}

            {/* Soft Skills */}
            {palavrasChaveFaltantes.softSkills?.length > 0 && (
                <div className="keyword-group">
                    <span className="keyword-label">Soft Skills:</span>
                    <div className="tags-container">
                        {palavrasChaveFaltantes.softSkills.map((item, index) => (
                            <span key={`soft-${index}`} className="tag tag-soft">{item}</span>
                        ))}
                    </div>
                </div>
            )}
        </div>
    )}
</div>
                        </div>
                    ) : (
                        <div className="results-card placeholder">
                            {isLoading && (
                            <div className="progress-bar-container">
                                <span className="range__label">A analisar o CV...</span>
                                <div className="range"></div>
                            </div>
                            )}
                        </div>
                    )}
                </section>

            </main>
        </div>
    );
}

export default PdfAnalyzer;