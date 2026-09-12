import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home/HomePage'
import AnalyzerCV from './pages/PdfAnalyze/PdfAnalyzer'
import Analyzer from './pages/JobAnalyze/JobAnalyzer'


function App() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/PdfAnalyzer" element={<AnalyzerCV />} />
            <Route path="/JobAnalyzer" element={<Analyzer />} />
        </Routes>
    )
}

export default App