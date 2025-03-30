'use client';
import React, { useEffect, useState } from 'react';
/* import { useState } from 'react'; */
import styles from './movies.module.css';
import getMovies from '../../../services/getMovies';
import MovieCard from '../components/movieCard';
import ModalMovie from '../components/modalMovie'; // Asegúrate de que la ruta sea correcta
import getMovieById from '../../../services/getMovieById'; // Asegúrate de que la ruta sea correcta
const MoviesPage = () => {
 const [allmovies, setAllmovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); 
  const [selectedMovie, setSelectedMovie] = useState(null);
const [isModalOpen, setIsModalOpen] = useState(false);


//const allmovies =  getMovies();  
/* setAllmovies(movies); */

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

  const handleclick= async (idmovie)=>{
    console.log('ID de la película:', idmovie);
    try {
      const movieData = await getMovieById(idmovie);
      console.log('Detalles de la película:', movieData);
      setSelectedMovie(movieData);
      setIsModalOpen(true);
    } catch (error) {
      console.error('Error al cargar los detalles de la película:', error);
    }

  }

  return (
    <div className={styles.moviesContainer}>
      
      <h1 className="mb-4 text-white">Peliculas y Series</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
        {allmovies.map((movie, index) => (
          <MovieCard
            key={movie._id || index} 
            title={movie.title}
            synopsis={movie.synopsis}
            releaseYear={movie.releaseYear}
            image={movie.image}
            onClick={() => handleclick(movie._id)}
          />
        ))}
      </div>
      {selectedMovie && (
        <ModalMovie
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title={selectedMovie.title}
        synopsis={selectedMovie.synopsis}
        releaseYear={selectedMovie.releaseYear}
        image={selectedMovie.image}
  />
)}

    </div>
  );
};

export default MoviesPage;