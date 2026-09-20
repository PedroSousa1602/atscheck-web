import { useState } from 'react';
import api from '../services/Api';
import './job.css';
import { useNavigate } from 'react-router-dom';

import {ToastContainer, toast} from 'react-toastify';

function Analyzer() {
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
            let notify = () => toast.info("Nenhum ficheiro selecionado. Por favor, selecione um ficheiro PDF para análise.");
            notify();
            return;
        }

        setIsLoading(true);

        const formData = new FormData();
        formData.append('file', file);
        let setresponse = null;

        const jobDescription = e.target.story.value;
        formData.append('opportunityText', jobDescription);

        try {
            const response = await api.post('/analyze-CVopportunity', formData, jobDescription);
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
                const msgBack = "Análise concluída com sucesso!";
                const notify = () => toast.success(msgBack);
                notify();
                setresponse = parsedData;
            }

            setAnalyzed(true);
        } catch (error) {
            const msgBack = error.response?.data?.message;
            const notify = () => toast.error(msgBack);
            notify();
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
        <div className="Analyzer">
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

    <main className="container">

                <section className="upload-section">
                    <form className="upload-card" onSubmit={handleFileUpload} >
                        <h2>Carregar CV</h2>
                        <p className="upload-subtitle">Selecione o seu currículo em formato PDF para começar a análise.</p>

                        <label className="file-dropzone">
                            <input type="file" accept=".pdf" onChange={handleFileChange} />
                            <span className="dropzone-text">Clique aqui ou arraste o ficheiro .PDF</span>
                        </label>

                        <label htmlFor="story">Descreva a vaga de emprego</label>
                        <textarea id="story" name="story" rows="5" cols="33"></textarea>

                        <button type="submit" className="btn-submit">Analisar Currículo</button>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={5000}
                            hideProgressBar={false}
                            newestOnTop={false}
                            closeOnClick={false}
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover
                            theme="light"
                            />
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

export default Analyzer;
