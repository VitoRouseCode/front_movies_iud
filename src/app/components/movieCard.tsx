import React from 'react';
import styles from './MovieCard.module.css'; // Opcional, para estilos personalizados

// Definimos el tipo de las props basado en tu JSON
type MovieCardProps  = {
  title: string;
  synopsis: string;
  releaseYear: number;
  image?: string; // Opcional, usaremos un placeholder si no llega
};

const MovieCard = ({ title, synopsis, releaseYear, image }: MovieCardProps) => {
  // Placeholder para la imagen si no se proporciona
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNcPVbPV6fHpXYC8TekdMX_5aK8GunG_KkA&s';

  return (
    <div className="card" style={{ width: '13rem', margin: '10px' }}>
      <img
        src={image || defaultImage}
        className="card-img-top"
        alt={title}
        style={{ objectFit: 'cover' }}
      />
      <div className="card-body">
        <h5 className="card-title">{title}</h5>
        <p className="card-text">{synopsis}</p>
        <p className="card-text">
          <small className="text-muted">Año: {releaseYear}</small>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;