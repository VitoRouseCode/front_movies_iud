'use client';
import React, { useEffect} from 'react';
import { useState } from 'react';
import styles from './movies.module.css';
import getMovies from '../../../services/getMovies';
import MovieCard from '../components/movieCard';





const MoviesPage =  () => {
    const [allmovies, setAllmovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      try {
        console.log('Iniciando petición a la API...');
        const data = await getMovies();
        console.log('Respuesta de la API:', data); // Esto debería mostrar el JSON
        setAllmovies(data);
      } catch (error) {
        console.error('Error al obtener las películas:', error);
        setError('No se pudieron cargar las películas');
      } finally {
        setLoading(false); // Se ejecuta siempre, éxito o fallo
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

  return (
    <div className={styles.moviesContainer}>
      <h1 className="mb-4">Lista de Películas</h1>
      <div style={{display: 'flex', flexWrap: 'wrap',padding: '10px'}}>
      {allmovies.map((movie) => (
        <MovieCard
          key={movie.id}
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