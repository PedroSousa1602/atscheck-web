import { Routes, Route } from 'react-router-dom'
import Home from './pages/HomePage'
import AnalyzerCV from './pages/PdfAnalyzer'
import Analyzer from './pages/JobAnalyzer'


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