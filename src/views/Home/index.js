import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Table from './components/Table';
import atividadeSendRequest from '../../services/atividade.service';
import './index.css';

const Home = (props) => {
  const { data, setData } = props;
  const [showModal, setShowModal] = useState(false);
  const [itemIdToDelete, setItemIdToDelete] = useState(null);
  const [searchId, setSearchId] = useState('');
  const [searchData, setSearchData] = useState([]);

  useEffect(() => {
    atualizarAtividades();
  }, []);

  useEffect(() => {
    if (showModal) {
      document.body.classList.add('modal-open');
    } else {
      document.body.classList.remove('modal-open');
    }
  }, [showModal]);

  const handleExcluir = (id) => {
    setItemIdToDelete(id);
    setShowModal(true);
  };

  const confirmarExclusao = () => {
    if (itemIdToDelete) {
      atividadeSendRequest(callbackExclusao, 'delete', itemIdToDelete);
    }
  };

  const callbackExclusao = (response) => {
    setShowModal(false);
    if (searchData.length > 0) {
      setSearchData(searchData.filter((item) => item.id !== itemIdToDelete));
    } else {
      atualizarAtividades();
    }
  };

  const cancelarExclusao = () => {
    setShowModal(false);
  };

  const atualizarAtividades = () => {
    atividadeSendRequest(callbackAtualizacao, 'get');
  };

  const callbackAtualizacao = (response) => {
    setData(response.data);
  };

  const buscarPorId = () => {
    if (searchId) {
      atividadeSendRequest(callbackBuscaPorId, 'get', searchId);
    } else {
      setSearchData();
    }
  };

  const callbackBuscaPorId = (response) => {
    setSearchData(response.data);
  };

  return (
    <div className={`container ${showModal ? 'modal-open' : ''}`}>
      <Header />
      <div className="input-group my-4">
        <input
          type="text"
          className="form-control"
          placeholder="Digite o ID de pesquisa"
          value={searchId}
          onChange={(e) => setSearchId(e.target.value)}
        />
        <div className="input-group-append">
          <button className="btn btn-light btn-outline-secondary" type="button" onClick={(e) => { e.stopPropagation(); buscarPorId() }}>Buscar por ID</button>
        </div>
      </div>

      <Table data={searchData !== undefined && searchData.length > 0 ? searchData : data} handleExcluir={handleExcluir} />

      {showModal && (
        <div className="modal" id="ModalID" tabIndex="-1" role="dialog" style={{ display: 'block' }}>
          <div className="modal-dialog" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Confirmação de Exclusão</h5>
                <button type="button" className="close" onClick={cancelarExclusao}>
                  <span aria-hidden="true">&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <p>Tem certeza de que deseja excluir esta atividade?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={cancelarExclusao}>
                  Cancelar
                </button>
                <button type="button" className="btn btn-danger" onClick={confirmarExclusao}>
                  Excluir
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
