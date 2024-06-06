
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home';
import Uen from './pages/Uen/Uen';
import Weather from './pages/Weather/Weather';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/uen" element={<Uen />} />
        <Route path="/weather" element={<Weather />} />
      </Routes>
    </Router>
  );
}

export default App;
