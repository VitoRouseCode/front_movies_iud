// services/producers.js

import { API_BASE_URL } from './getMovies';

// Obtener todas las productoras
export const getProducers = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/producers`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener las productoras');
    return await response.json();
  } catch (error) {
    console.error('Error en getProducers:', error);
    throw error;
  }
};

// Crear una productora
export const createProducer = async (producerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/producers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producerData),
    });
    if (!response.ok) throw new Error('Error al crear la productora');
    return await response.json();
  } catch (error) {
    console.error('Error en createProducer:', error);
    throw error;
  }
};

// Actualizar una productora
export const updateProducer = async (id, producerData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/producers/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(producerData),
    });
    if (!response.ok) throw new Error('Error al actualizar la productora');
    return await response.json();
  } catch (error) {
    console.error('Error en updateProducer:', error);
    throw error;
  }
};

// Eliminar una productora
export const deleteProducer = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/producers/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar la productora');
    return await response.json();
  } catch (error) {
    console.error('Error en deleteProducer:', error);
    throw error;
  }
};