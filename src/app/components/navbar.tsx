'use client';
import React, { useEffect } from 'react';
import styles from './Navbar.module.css';
import Image from 'next/image';
import image from '../../../public/logopeliculas.png';

const Navbar = () => {
  useEffect(() => {
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return (
    <nav style={{backgroundColor:"#1A1F2E"}}  className={`navbar navbar-expand-lg `}>
      <div className="container-fluid ">
        <a className="navbar-brand" href="/">
          <Image priority={true} alt="Logo de películas" src={image} width={130} height={50} />
        </a>
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
        <div className="collapse navbar-collapse " id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <a className="nav-link text-white p-3 text-center" aria-current="page" href="/">
                <i className="bi bi-house me-1 " style={{ fontSize: '1.2rem' }}></i> INICIO
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link text-white p-3 text-center" href="/movies">
                <i className="bi bi-film me-1" style={{ fontSize: '1.2rem' }}></i> PELÍCULAS
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle text-white p-3 text-center"
                href="#"
                id="navbarDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                <i className="bi bi-gear me-1" style={{ fontSize: '1.2rem' }}></i> CONFIGURACIÓN
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                <li><a className="dropdown-item" href="/directors">Directores</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Géneros</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Productoras</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Tipos</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Películas y Series</a></li>
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
              <i className="bi bi-search text-white" style={{ fontSize: '1.2rem' }}></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;