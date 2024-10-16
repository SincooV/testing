import { useState } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-logo">
          <a href='/'>N/A</a>
        </h1>
        
        <button className="navbar-toggle" onClick={toggleMenu}>
          &#9776;
        </button>
        <ul className={`navbar-menu ${isMenuOpen ? 'active' : ''}`}>
          <li className='falling'><a href="/">Home</a></li>
          <li className='falling'><a href="/maintenance">Serviços</a></li>
          <li className='falling'><a href="/maintenance">Sobre</a></li>
          <li className='falling'><a href="/maintenance">Contato</a></li>
          <li className='falling' id="registers"><a href="/register" className="registers">Registre-se</a></li>
        </ul>
        <div className='divregistro'>
        <a className='registro' href="/register">Inscreva-se</a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
