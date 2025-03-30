'use client';
import React, { useState, useEffect } from 'react';
import styles from './genres.module.css'; // Usaremos un archivo CSS específico para géneros
import {
  getGenres,
  createGenre,
  updateGenre,
  deleteGenre,
} from '../../../services/genre'; // Servicios para géneros
import Swal from 'sweetalert2';

const GenresPage = () => {
  const [genres, setGenres] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '', status: 'Activo' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchGenres = async () => {
    try {
      const data = await getGenres();
      setGenres(data);
    } catch (err) {
      setError('No se pudieron cargar los géneros');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchGenres();
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
        await updateGenre(editId, formData);
        setEditId(null);
        setShowModal(false);
      } else {
        await createGenre(formData);
      }
      setFormData({ name: '', description: '', status: 'Activo' });
      await fetchGenres();
    } catch (err) {
      setError('Error al guardar el género');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (genre) => {
    setFormData({ name: genre.name, description: genre.description, status: genre.status });
    setEditId(genre._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar este género?',
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
        await deleteGenre(id);
        await fetchGenres();
        Swal.fire('¡Eliminado!', 'El género ha sido eliminado.', 'success');
      } catch (err) {
        setError('Error al eliminar el género');
        Swal.fire('Error', 'No se pudo eliminar el género.', 'error');
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
        <p className="mt-3" style={{ color: '#FFFFFF' }}>Cargando generos...</p>
      </div>
    );
  if (error) return <div className={styles.genresContainer}>{error}</div>;

  return (
    <div className="container">
      <div className={styles.genresContainer}>
        <h1 className="mb-4 text-center">Gestión de Géneros</h1>

        {/* Formulario de creación */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row g-3">
            <div className="col-md-4">
              <label htmlFor="name" className={`form-label ${styles.formLabel}`}>
                Nombre
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-4">
              <label htmlFor="description" className={`form-label ${styles.formLabel}`}>
                Descripción
              </label>
              <input
                type="text"
                className="form-control"
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-2">
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

        {/* Lista de géneros */}
        <div className="table-responsive">
          <table className={`table table-striped ${styles.table}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {genres.length > 0 ? (
                genres.map((genre) => (
                  <tr key={genre._id}>
                    <td>{genre.name}</td>
                    <td>{genre.description}</td>
                    <td>{genre.status}</td>
                    <td>
                      {genre.createdAt
                        ? new Date(genre.createdAt).toLocaleDateString()
                        : 'Sin fecha'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(genre)}
                        data-bs-toggle="tooltip"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(genre._id)}
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
                  <td colSpan={5} className="text-center">No hay géneros disponibles</td>
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
                  <h5 className={`modal-title ${styles.modalTitle}`}>Editar Género</h5>
                  <button
                    type="button"
                    className={`btn-close ${styles.btnClose}`}
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label htmlFor="editName" className={`form-label ${styles.formLabel}`}>
                        Nombre
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editName"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="editDescription" className={`form-label ${styles.formLabel}`}>
                        Descripción
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editDescription"
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
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

export default GenresPage;