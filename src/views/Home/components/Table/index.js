import React from 'react';
import { Link } from 'react-router-dom';

const Table = ({ data, handleExcluir }) => {
    return (
        <table className="table">
            <thead className="thead-light">
                <tr>
                    <th scope="col">#id</th>
                    <th scope="col">Data</th>
                    <th scope="col">Projeto</th>
                    <th scope="col">Descrição</th>
                    <th scope="col">Ações</th>
                </tr>
            </thead>
            <tbody>
                {data.length > 0 ? (
                    data.map((item, index) => (
                        <tr key={index}>
                            {item ? (
                                <>
                                    <th scope="row">{item.id}</th>
                                    <td>{item.data}</td>
                                    <td>{item.projeto}</td>
                                    <td>{item.descricao}</td>
                                    <td>
                                        <button
                                            type="button"
                                            className="btn btn-danger mr-2"
                                            data-bs-toggle="modal"
                                            data-bs-target="modalID"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleExcluir(item.id);
                                
                                            }}
                                        >
                                            Excluir
                                        </button>
                                        <span> </span>
                                        <Link className="btn btn-primary" to={`/alterar/${item.id}`}>
                                            Alterar
                                        </Link>
                                    </td>
                                </>
                            ) : (
                                <td colSpan="5">Item inválido</td>
                            )}
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td colSpan="5">Nenhum dado disponível</td>
                    </tr>
                )}
            </tbody>
        </table>
    );
};

export default Table;
