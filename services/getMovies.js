

export const API_BASE_URL = 'http://localhost:3100/api'; 

 const getMovies = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    if (!response.ok) throw new Error('Error al obtener las películas');
    return response.json();
  } catch (error) {
    console.error('Error en getMovies:', error);
    throw error;
  }
};
export default getMovies;