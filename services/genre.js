const API_BASE_URL = 'http://localhost:3100/api';

// Obtener todos los géneros
export const getGenres = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los géneros');
    return await response.json();
  } catch (error) {
    console.error('Error en getGenres:', error);
    throw error;
  }
};

// Crear un género
export const createGenre = async (genreData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genreData),
    });
    if (!response.ok) throw new Error('Error al crear el género');
    return await response.json();
  } catch (error) {
    console.error('Error en createGenre:', error);
    throw error;
  }
};

// Actualizar un género
export const updateGenre = async (id, genreData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(genreData),
    });
    if (!response.ok) throw new Error('Error al actualizar el género');
    return await response.json();
  } catch (error) {
    console.error('Error en updateGenre:', error);
    throw error;
  }
};

// Eliminar un género
export const deleteGenre = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el género');
    return await response.json();
  } catch (error) {
    console.error('Error en deleteGenre:', error);
    throw error;
  }
};