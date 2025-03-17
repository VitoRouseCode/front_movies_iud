import React from 'react';
import styles from './MovieCard.module.css';

type MovieCardProps = {
  title: string;
  synopsis: string;
  releaseYear: number;
  image?: string;
};

const MovieCard = ({ title, synopsis, releaseYear, image }: MovieCardProps) => {
  const defaultImage = 'https://freepiker-storage.s3.amazonaws.com/preview/polaroid-photframe-photo-template-film-style-mockup-graphics-1517997990-preview.jpg';

  return (
    <div
      className="card"
      style={{
        width: '11rem', // Más ancha
        height: '350px', // Límite de altura
        margin: '16px',
        boxShadow: '0 0 10pxrgb(93, 102, 137)',
        overflow: 'hidden', // Evita que el contenido desborde
      }}
    >
      <img
        src={image || defaultImage}
        className="card-img-top"
        alt={title}
        style={{
          objectFit: 'cover',
          height: '200px', // Altura fija para la imagen
          width: '100%', // Ocupa todo el ancho
        }}
        
      />
      <div className="card-body text-white" style={{ padding: '10px', backgroundColor:'#2D334A' }}>
        <h5 className="card-title" style={{ marginBottom: '5px',justifyContent:"center",  display:'flex' }}>{title}</h5>
        <p
          className="card-text"
          style={{
            fontSize: '0.7rem',
            
            height: '60px', // Limita el espacio para la sinopsis
            overflow: 'hidden',
            textOverflow: 'ellipsis', // Agrega "..." si el texto se corta
            display: '-webkit-box',
            WebkitLineClamp: 2, // Limita a 2 líneas
            WebkitBoxOrient: 'vertical',
          }}
        >
          {synopsis}
        </p>
        <p className="card-text " style={{ fontSize: '0.9rem',marginBottom: '-10px',display:'flex',justifyContent:'center' }}>
          <i className="bi bi-calendar me-1"></i>
          <small className=" text-white">Año: {releaseYear}</small>
        </p>
      </div>
    </div>
  );
};

export default MovieCard;