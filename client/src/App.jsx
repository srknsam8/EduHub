import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Landing from './components/Landing/Landing';
import Quiz from './components/Quiz/Quiz';
import Success from './components/Quiz/Success';
import Model from './components/Model/Model';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index path="/" element={<Landing />} />
        
        <Route path="/quiz/:id" element={<Quiz />} />
        <Route path="/success" element={<Success />} />
        <Route path='/model' element={<Model />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
