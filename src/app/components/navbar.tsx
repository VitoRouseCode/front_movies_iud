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
              <a className="nav-link active" aria-current="page" 
              style={{color:"white"}} href="/"><i style={{marginLeft:'15px',marginRight:'5px', fontSize: '1.2rem'}} 
              className="bi bi-house"></i>INICIO</a>
            </li>
            <li className="nav-item">
              <a className="nav-link" style={{color:"white"}} href="/movies"><i 
              style={{marginLeft:'15px',marginRight:'5px',fontSize: '1.2rem'}} 
              className="bi bi-film"></i>PELICULAS</a>
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
              ><i style={{marginLeft:'15px',marginRight:'5px',fontSize: '1.2rem'}} className="bi bi-gear"></i>
                CONFIGURACION
              </a>
              <ul className="dropdown-menu" aria-labelledby="navbarDropdown" style={{color:"white"}}>
                <li><a className="dropdown-item" href="/directors">Directores</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Generos</a><span ></span></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Productoras</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">Tipos</a></li>
                <li><hr className="dropdown-divider" /></li>
                <li><a className="dropdown-item" href="#">peliculas y Series</a></li>
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
            <i style={{fontSize: '1.2rem'}} className="bi bi-search"></i>
            </button>
          </form>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;