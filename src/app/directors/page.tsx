'use client';
import React, { useState, useEffect } from 'react';
import styles from './directors.module.css';
import {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} from '../../../services/directors';

const DirectorsPage = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ names: '', status: 'Activo' });
  const [editId, setEditId] = useState(null);

  // Función para cargar directores
  const fetchDirectors = async () => {
    try {
      const data = await getDirectors();
      console.log('Directores recibidos:', data);
      setDirectors(data);
    } catch (err) {
      setError('No se pudieron cargar los directores');
    } finally {
      setLoading(false);
    }
  };

  // Cargar directores al montar el componente
  useEffect(() => {
    fetchDirectors();
  }, []);

  // Manejar cambios en el formulario
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Enviar formulario (crear o actualizar)
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Mostrar "Cargando..." mientras se procesa
    try {
      if (editId) {
        // Actualizar director
        await updateDirector(editId, formData);
        setEditId(null);
      } else {
        // Crear director
        await createDirector(formData);
      }
      setFormData({ names: '', status: 'Activo' }); // Resetear formulario
      await fetchDirectors(); // Recargar la lista desde el servidor
    } catch (err) {
      setError('Error al guardar el director');
    } finally {
      setLoading(false);
    }
  };

  // Editar director
  const handleEdit = (director) => {
    setFormData({ names: director.names, status: director.status });
    setEditId(director._id);
  };

  // Eliminar director
  const handleDelete = async (id) => {
    if (confirm('¿Estás seguro de eliminar este director?')) {
      setLoading(true);
      try {
        await deleteDirector(id);
        await fetchDirectors(); // Recargar la lista desde el servidor
      } catch (err) {
        setError('Error al eliminar el director');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className={styles.directorsContainer}>Cargando...</div>;
  if (error) return <div className={styles.directorsContainer}>{error}</div>;

  return (
    <div className={styles.directorsContainer}>
      <h1 className="mb-4 text-center">Gestión de Directores</h1>

      {/* Formulario */}
      <form onSubmit={handleSubmit} className="mb-5">
        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="names" className="form-label">
              Nombres
            </label>
            <input
              type="text"
              className="form-control"
              id="names"
              name="names"
              value={formData.names}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="status" className="form-label">
              Estado
            </label>
            <select
              className="form-select"
              id="status"
              name="status"
              value={formData.status}
              onChange={handleInputChange}
            >
              <option value="Activo">Activo</option>
              <option value="Inactivo">Inactivo</option>
            </select>
          </div>
          <div className="col-md-2 d-flex align-items-end">
            <button type="submit" className="btn btn-primary w-100">
              {editId ? 'Actualizar' : 'Crear'}
            </button>
          </div>
        </div>
      </form>

      {/* Lista de directores */}
      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Nombres</th>
              <th>Estado</th>
              <th>Creado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {directors.length > 0 ? (
              directors.map((director) => (
                <tr key={director._id}>
                  <td>{director.names}</td>
                  <td>{director.status}</td>
                  <td>
                    {director.createdAt
                      ? new Date(director.createdAt).toLocaleDateString()
                      : 'Sin fecha'}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => handleEdit(director)}
                    >
                      Editar
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(director._id)}
                    >
                      Eliminar
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">
                  No hay directores disponibles
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DirectorsPage;