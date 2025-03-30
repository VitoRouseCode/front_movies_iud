
import React from 'react';
import styles from './MovieCard.module.css'; // Importamos el módulo CSS

type MovieCardProps = {
  title: string;
  synopsis: string;
  releaseYear: number;
  image?: string;
  onClick?: (id: number) => void; 
  id?: number;
};

const MovieCard = ({ title, synopsis, releaseYear, image, onClick, id }: MovieCardProps) => {
  const defaultImage = 'https://freepiker-storage.s3.amazonaws.com/preview/polaroid-photframe-photo-template-film-style-mockup-graphics-1517997990-preview.jpg';

  return (
    <div className={styles.card} style={{ cursor: onClick ? 'pointer' : 'default' }}>
      <img
        src={image || defaultImage}
        className={styles.cardImg}
        alt={title}
        onClick={onClick ? () => onClick(id) : undefined}
      />
      <div className={styles.cardBody}>
        <h5 className={styles.cardTitle}>{title}</h5>
        <p className={styles.cardSynopsis}>Sinopsis: {synopsis}</p>
        <p className={styles.cardText}>
          <i className="bi bi-calendar me-1"></i>
          <small>Año: {releaseYear}</small>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;