import './home.css';

function Home() {
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
                    <button className="analyzeCV">Analisar CV</button>
                    <button className="analyzeJob">Analisar CV e Vaga</button>
                </div>

            </header>
        </div>
    );
}

export default Home;
