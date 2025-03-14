'use client';
import React, { useEffect } from 'react';
import { useState } from 'react';
import styles from './movies.module.css';
import getMovies from '../../../services/getMovies';
import MovieCard from '../components/movieCard';

const MoviesPage = () => {
  const [allmovies, setAllmovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Iniciando petición a la API...');
        const data = await getMovies();
        console.log('Respuesta de la API:', data);
        setAllmovies(data || []);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
        setError('No se pudieron cargar las películas');
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, []);

  if (loading) {
    return <div className={styles.moviesContainer}>Cargando películas...</div>;
  }

  if (error) {
    return <div className={styles.moviesContainer}>{error}</div>;
  }

  if (!allmovies || allmovies.length === 0) {
    return <div className={styles.moviesContainer}>No hay películas disponibles</div>;
  }

  return (
    <div className={styles.moviesContainer}>
      <h1 className="mb-4">Películas</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
        {allmovies.map((movie, index) => (
          <MovieCard
            key={movie.id || index} 
            title={movie.title}
            synopsis={movie.synopsis}
            releaseYear={movie.releaseYear}
            image={movie.image}
          />
        ))}
      </div>
    </div>
  );
};

export default MoviesPage;