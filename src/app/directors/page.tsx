'use client';
import React, { useState, useEffect } from 'react';
import styles from './directors.module.css';
import {
  getDirectors,
  createDirector,
  updateDirector,
  deleteDirector,
} from '../../../services/directors';
import Swal from 'sweetalert2';

const DirectorsPage = () => {
  const [directors, setDirectors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ names: '', status: 'Activo' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchDirectors = async () => {
    try {
      const data = await getDirectors();
      setDirectors(data);
    } catch (err) {
      setError('No se pudieron cargar los directores');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDirectors();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editId) {
        await updateDirector(editId, formData);
        setEditId(null);
        setShowModal(false);
      } else {
        await createDirector(formData);
      }
      setFormData({ names: '', status: 'Activo' });
      await fetchDirectors();
    } catch (err) {
      setError('Error al guardar el director');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (director) => {
    setFormData({ names: director.names, status: director.status });
    setEditId(director._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar este director?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#d33',
      cancelButtonColor: '#3085d6',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    });

    if (result.isConfirmed) {
      setLoading(true);
      try {
        await deleteDirector(id);
        await fetchDirectors();
        Swal.fire('¡Eliminado!', 'El director ha sido eliminado.', 'success');
      } catch (err) {
        setError('Error al eliminar el director');
        Swal.fire('Error', 'No se pudo eliminar el director.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return (
    <div className={styles.producersContainer} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '75vh' }}>
      <div className="spinner-border text-primary" role="status" style={{ width: '3rem', height: '3rem' }}>
        <span className="visually-hidden">Cargando...</span>
      </div>
      <p className="mt-3" style={{ color: '#FFFFFF' }}>Cargando directores...</p>
    </div>
  );
  if (error) return <div className={styles.directorsContainer}>{error}</div>;

  return (
    <div className="container">
      <div className={styles.directorsContainer}>
        <h1 className="mb-4 text-center">Gestión de Directores</h1>

        {/* Formulario de creación */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="names" className={`form-label ${styles.formLabel}`}>
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
              <label htmlFor="status" className={`form-label ${styles.formLabel}`}>
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
                Crear
              </button>
            </div>
          </div>
        </form>

        {/* Lista de directores */}
        <div className="table-responsive">
          <table className={`table table-striped ${styles.table}`}>
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
                        data-bs-toggle="tooltip"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(director._id)}
                        data-bs-toggle="tooltip"
                        title="Eliminar"
                      >
                      <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center">No hay directores disponibles</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal para edición */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog">
              <div className={`modal-content ${styles.modalContent}`}>
                <div className={`modal-header ${styles.modalHeader}`}>
                  <h5 className={`modal-title ${styles.modalTitle}`}>Editar Director</h5>
                  <button
                    type="button"
                    className={`btn-close ${styles.btnClose}`}
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="editNames" className={`form-label ${styles.formLabel}`}>
                        Nombres
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editNames"
                        name="names"
                        value={formData.names}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editStatus" className={`form-label ${styles.formLabel}`}>
                        Estado
                      </label>
                      <select
                        className="form-select"
                        id="editStatus"
                        name="status"
                        value={formData.status}
                        onChange={handleInputChange}
                      >
                        <option value="Activo">Activo</option>
                        <option value="Inactivo">Inactivo</option>
                      </select>
                    </div>
                  </div>
                  <div className={`modal-footer ${styles.modalFooter}`}>
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={() => setShowModal(false)}
                    >
                      Cancelar
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Actualizar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default DirectorsPage;