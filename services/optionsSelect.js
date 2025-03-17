// services/selectOptions.js
const API_BASE_URL = 'http://localhost:3100/api';

// Obtener géneros para el select
export const getGenresForSelect = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/genres`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los géneros para el select');
    const genres = await response.json();
    return genres.map((genre) => ({
      value: genre._id,
      label: genre.name,
    }));
  } catch (error) {
    console.error('Error en getGenresForSelect:', error);
    throw error;
  }
};

// Obtener directores para el select
export const getDirectorsForSelect = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/directors`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los directores para el select');
    const directors = await response.json();
    return directors.map((director) => ({
      value: director._id,
      label: director.names,
    }));
  } catch (error) {
    console.error('Error en getDirectorsForSelect:', error);
    throw error;
  }
};

// Obtener productoras para el select
export const getProducersForSelect = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/producers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener las productoras para el select');
    const producers = await response.json();
    return producers.map((producer) => ({
      value: producer._id,
      label: producer.name,
    }));
  } catch (error) {
    console.error('Error en getProducersForSelect:', error);
    throw error;
  }
};

// Obtener tipos para el select
export const getTypesForSelect = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/types`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los tipos para el select');
    const types = await response.json();
    return types.map((type) => ({
      value: type._id,
      label: type.name,
    }));
  } catch (error) {
    console.error('Error en getTypesForSelect:', error);
    throw error;
  }
};