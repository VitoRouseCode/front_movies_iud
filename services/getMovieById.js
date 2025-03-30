// services/getMovieById.ts
import { API_BASE_URL } from './getMovies'; // o de donde estés exportando esa constante

const getMovieById = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) throw new Error('No se pudo obtener la película');

    return await response.json();
  } catch (error) {
    console.error(`Error al obtener la película con ID ${id}:`, error);
    throw error;
  }
};

export default getMovieById;
