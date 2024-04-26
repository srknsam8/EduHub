import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import AllQuiz from './components/AllQuiz/AllQuiz';
import Landing from './components/Landing/Landing';
import Model from './components/Model/Model';
import Quiz from './components/Quiz/Quiz';
import Success from './components/Quiz/Success';
import Report from './components/Report/Report';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        <Route path="/quiz" element={<AllQuiz />} />
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/success" element={<Success />} />
        <Route path="/model" element={<Model />} />
        <Route path="/report" element={<Report />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
