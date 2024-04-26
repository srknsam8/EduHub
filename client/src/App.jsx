import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Quiz from './components/Quiz/Quiz';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/quiz/:id" element={<Quiz />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
