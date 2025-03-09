import React from 'react';
import styles from './HomePage.module.css'; // Importamos los estilos del módulo CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Ya está en layout.tsx, pero lo mencionamos por claridad

const WelcomPage = () => {
  return (
    <div className={styles.hero}>
      <div className={styles.overlay}>
        <div className="container text-center text-white d-flex flex-column justify-content-center h-100">
          <h1 className={styles.title}>Atenea</h1>
          <p className={styles.slogan}>Películas de la IU digital</p>
          <a href="/movies" className={`btn btn-danger ${styles.customButton}`}>Ver películas</a>
        </div>
      </div>
    </div>
  );
};

export default WelcomPage;