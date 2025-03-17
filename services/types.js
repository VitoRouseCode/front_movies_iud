// services/types.js
const API_BASE_URL = 'http://localhost:3100/api';

// Obtener todos los tipos
export const getTypes = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/types`, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al obtener los tipos');
    return await response.json();
  } catch (error) {
    console.error('Error en getTypes:', error);
    throw error;
  }
};

// Crear un tipo
export const createType = async (typeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/types`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typeData),
    });
    if (!response.ok) throw new Error('Error al crear el tipo');
    return await response.json();
  } catch (error) {
    console.error('Error en createType:', error);
    throw error;
  }
};

// Actualizar un tipo
export const updateType = async (id, typeData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/types/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(typeData),
    });
    if (!response.ok) throw new Error('Error al actualizar el tipo');
    return await response.json();
  } catch (error) {
    console.error('Error en updateType:', error);
    throw error;
  }
};

// Eliminar un tipo
export const deleteType = async (id) => {
  try {
    const response = await fetch(`${API_BASE_URL}/types/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
    });
    if (!response.ok) throw new Error('Error al eliminar el tipo');
    return await response.json();
  } catch (error) {
    console.error('Error en deleteType:', error);
    throw error;
  }
};