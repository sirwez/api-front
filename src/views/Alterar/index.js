import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import atividadeSendRequest from '../../services/atividade.service';
import Header from '../Home/components/Header';

const AlterarAtividade = () => {
  const [descricao, setDescricao] = useState('');
  const { id } = useParams();

  useEffect(() => {
    buscarAtividadePorId();
  }, []);

  const buscarAtividadePorId = () => {
    atividadeSendRequest(callbackBuscaPorId, 'get', id);
  };

  const callbackBuscaPorId = (response) => {
    setDescricao(response.data[0].descricao);
  };

  const handleAlterar = () => {
    const atividadeAtualizada = {
      descricao: descricao
    };

    atividadeSendRequest(callbackAlteracao, 'put', id, atividadeAtualizada);
  };

  const callbackAlteracao = (response) => {
    console.log('Atividade alterada com sucesso');
    window.location.href = '/';
  };

  return (
    <div className="container">
      <Header />
      <h2 className="my-2">Alterar Atividade</h2>
      <div className="row">
        <div className="col-md-6 mb-1">
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
        </div>
      </div>
      <div className="row">
        <div className="col-md-6">
          <button className="btn btn-primary" onClick={handleAlterar}>Alterar</button>
        </div>
      </div>
    </div>
  );
};

export default AlterarAtividade;
