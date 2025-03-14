import React from 'react';
import styles from './MovieCard.module.css';

type MovieCardProps = {
  title: string;
  synopsis: string;
  releaseYear: number;
  image?: string;
};

const MovieCard = ({ title, synopsis, releaseYear, image }: MovieCardProps) => {
  const defaultImage = 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTNcPVbPV6fHpXYC8TekdMX_5aK8GunG_KkA&s';

  return (
    <div
      className="card"
      style={{
        width: '15rem', // Más ancha
        maxHeight: '400px', // Límite de altura
        margin: '16px',
        boxShadow: '0 0 10px rgba(180, 177, 177, 0.82)',
        overflow: 'hidden', // Evita que el contenido desborde
      }}
    >
      <img
        src={image || defaultImage}
        className="card-img-top"
        alt={title}
        style={{
          objectFit: 'cover',
          height: '300px', // Altura fija para la imagen
          width: '100%', // Ocupa todo el ancho
        }}
      />
      <div className="card-body" style={{ padding: '10px' }}>
        <h5 className="card-title" style={{ marginBottom: '5px' }}>{title}</h5>
        <p
          className="card-text"
          style={{
            marginBottom: '5px',
            maxHeight: '60px', // Limita el espacio para la sinopsis
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Agrega "..." si el texto se corta
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limita a 2 líneas
            WebkitBoxOrient: 'vertical',
          }}
        >
          {synopsis}
        </p>
        <p className="card-text">
          <small className="text-muted">Año: {releaseYear}</small>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;