import axios from 'axios';
// get | post | delete | put

// listarTodos | listarID | cadastrar | excluir | atualizar
const atividadeSendRequest = (callback, verb, id = '', body = {}) =>{
    const API_URL = "http://localhost:8080";
    const RESOURCE = "atividades"
  
    let method = ''
  
    if(verb === 'get') {
      if(id)
        method = 'listarID'
      else 
        method = 'listarTodos'
    }
  
    if(verb === 'post')
      method = 'cadastrar'
  
    if(verb === 'delete')
      method = 'excluir'
  
    if(verb === 'put')
      method = 'alterar'
  
    const endpoint = `${API_URL}/${RESOURCE}/${method}/${id}`;
  
    axios[verb](endpoint, body)
    .then((response) => {
      callback(response);
    })
    .catch((error) => {
      console.error(error);

      if(method === 'listarID'){
        alert('Nenhum dado encontrado da sua pesquisa');
      } else if(method === 'cadastrar'){
        alert('Ocorreu um erro ao cadastrar, verifique os dados.');
      } else if(method === 'alterar'){
        alert('Ocorreu um erro ao atualizar.')
      } else{
        callback();
      }
    });
  }
  
  export default atividadeSendRequest;