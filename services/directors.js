
import { API_BASE_URL } from './getMovies';

// Obtener todos los directores
export const getDirectors = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/directors`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los directores');
    return await response.json();
  } catch (error) {
    console.error('Error en getDirectors:', error);
    throw error;
  }
};

// Crear un director
export const createDirector = async (directorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/directors`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(directorData),
    });
    if (!response.ok) throw new Error('Error al crear el director');
    return await response.json();
  } catch (error) {
    console.error('Error en createDirector:', error);
    throw error;
  }
};

// Actualizar un director
export const updateDirector = async (id, directorData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/directors/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(directorData),
    });
    if (!response.ok) throw new Error('Error al actualizar el director');
    return await response.json();
  } catch (error) {
    console.error('Error en updateDirector:', error);
    throw error;
  }
};

// Eliminar un director
export const deleteDirector = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/directors/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el director');
    return await response.json();
  } catch (error) {
    console.error('Error en deleteDirector:', error);
    throw error;
  }
};