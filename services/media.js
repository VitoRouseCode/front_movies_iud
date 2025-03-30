// services/media.js

import { API_BASE_URL } from './getMovies';

// Obtener todos los medios
export const getMedia = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los medios');
    
    return await response.json();
  } catch (error) {
    console.error('Error en getMedia:', error);
    throw error;
  }
};

// Crear un medio
export const createMedia = async (mediaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData),
    });
    if (!response.ok) throw new Error('Error al crear el medio');
    return await response.json();
  } catch (error) {
    console.error('Error en createMedia:', error);
    throw error;
  }
};

// Actualizar un medio
export const updateMedia = async (id, mediaData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(mediaData),
    });
    if (!response.ok) throw new Error('Error al actualizar el medio');
    return await response.json();
  } catch (error) {
    console.error('Error en updateMedia:', error);
    throw error;
  }
};

// Eliminar un medio
export const deleteMedia = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/medias/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el medio');
    return await response.json();
  } catch (error) {
    console.error('Error en deleteMedia:', error);
    throw error;
  }
};