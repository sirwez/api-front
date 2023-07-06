import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/">
            Home
          </Link>
          <ul className="navbar-nav ml-auto">
            <li className="nav-item">
              <Link className="nav-link" to="/cadastro">
                Cadastro
              </Link>
            </li>
          </ul>
        </div>
      </nav>

      <h2 className="my-4">Lista de Atividades</h2>
    </>
  )
}

export default Header;