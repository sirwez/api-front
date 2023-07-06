import './App.css';
import Home from './views/Home';
import Cadastro from './views/Cadastro';
import AlterarAtividade from './views/Alterar';
import axios from 'axios';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  const [data, setData] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:8080/atividades/listarTodos')
      .then((response) => {
        setData(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home data={data} setData={setData} />} />
        <Route path="/cadastro" element={<Cadastro setData={setData} />} />
        <Route path="/alterar/:id" element={<AlterarAtividade />} />
      </Routes>
    </Router>
  );
}

export default App;
