import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import atividadeSendRequest from '../../services/atividade.service';
import Header from '../Home/components/Header';

const CadastroAtividade = ({ atualizarAtividades }) => {
  const [descricao, setDescricao] = useState('');
  const [idProjeto, setIdProjeto] = useState('');
  const navigate = useNavigate();

  const cadastrarAtividade = () => {
    const novaAtividade = {
      descricao: descricao,
      idProjeto: idProjeto
    };

    atividadeSendRequest(callbackCadastro, 'post', '', novaAtividade);
  };

  const callbackCadastro = (response) => {
    alert('Atividade cadastrada com sucesso');
    setDescricao('');
    setIdProjeto('');
    navigate('/');
  };

  return (
    <div className="container">
      <Header />
      <h2 className="my-4">Cadastro de Atividade</h2>
      <div className="form-group">
        <label htmlFor="descricao">Descrição:</label>
        <input
          type="text"
          className="form-control"
          id="descricao"
          value={descricao}
          onChange={(e) => setDescricao(e.target.value)}
        />
      </div>
      <div className="form-group mb-2">
        <label htmlFor="idProjeto">ID do Projeto:</label>
        <input
          type="text"
          className="form-control"
          id="idProjeto"
          value={idProjeto}
          onChange={(e) => setIdProjeto(e.target.value)}
        />
      </div>
      <button className="btn btn-primary" onClick={(e) => { e.stopPropagation(); cadastrarAtividade() }}>Cadastrar</button>
    </div>
  );
};

export default CadastroAtividade;
