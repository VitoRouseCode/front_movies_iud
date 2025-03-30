// app/components/modalMovie.tsx
'use client'
import React, { useEffect } from 'react';
import styles from './modalMovie.module.css';
import { useRouter } from 'next/navigation';

const ModalMovie = ({ isOpen, onClose, title, synopsis, releaseYear, image }) => {


  if (!isOpen) return null;

  const handleEdit = () => {
    
    
  };

  useEffect(() => {
    console.log('ModalMovie props:', { isOpen, title, synopsis, releaseYear, image });
    
    }, [isOpen, title, synopsis, releaseYear, image]);


  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button onClick={onClose} className={styles.closeButton}>X</button>
        <div className={styles.content}>
          <img src={image} alt={title} className={styles.image} />
          <div className={styles.details}>
            <h2>{title}</h2>
            <p><strong>Año:</strong> {releaseYear}</p>
            <p>Sinopsis: {synopsis}</p>
            <button onClick={handleEdit} className={styles.editButton}>
            <a className="nav-link text-white text-center" href="/media"> ir a editar peliculas y series</a>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalMovie;
