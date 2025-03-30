import React from 'react';
import Image from 'next/image'; // Importamos el componente Image de Next.js
import styles from './HomePage.module.css'; // Importamos los estilos del módulo CSS
import 'bootstrap/dist/css/bootstrap.min.css'; // Ya está en layout.tsx, pero lo mencionamos por claridad
import image from '../../public/heroes.jpg';

const WelcomPage = () => {
  return (
    <div className={styles.hero}>
      <Image
        src = {image}
        alt="Fondo de películas" 
        fill={true}
        priority={true}
        loading="eager"
      />
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