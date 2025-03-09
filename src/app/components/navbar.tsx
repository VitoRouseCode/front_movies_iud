import React from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import image from '../../../public/logopeliculas.png';

const Navbar = () => {
  return (
    <nav className={`navbar navbar-expand-lg ${styles.navbarCustom}`}>
      <div className="container-fluid">
        <a className="navbar-brand" href="/"><Image alt='' src={image} width={130}></Image></a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" style={{color:"white"}} href="/">Inicio</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{color:"white"}} href="/movies">Películas</a>
            </li>
            <li className="nav-item dropdown" style={{color:"white"}}>
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
                style={{color:"white"}}
              >
                Categorías
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{color:"white"}}>
                <li><a className="dropdown-item" href="#">Acción</a></li>
                <li><a className="dropdown-item" href="#">Drama</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Ciencia ficción</a></li>
              </ul>
            </li>
            
          </ul>
          <form className="d-flex">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Buscar películas"
              aria-label="Search"
            />
            <button className={`btn ${styles.btnSearch}`} type="submit">
              Buscar
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;