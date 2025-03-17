// app/producers/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import styles from './producers.module.css'; // Archivo CSS específico
import {
  getProducers,
  createProducer,
  updateProducer,
  deleteProducer,
} from '../../../services/producers'; // Importamos los servicios
import Swal from 'sweetalert2';

const ProducersPage = () => {
  const [producers, setProducers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    slogan: '',
    description: '',
    status: 'Activo',
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchProducers = async () => {
    try {
      const data = await getProducers();
      setProducers(data);
    } catch (err) {
      setError('No se pudieron cargar las productoras');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducers();
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
        await updateProducer(editId, formData);
        setEditId(null);
        setShowModal(false);
      } else {
        await createProducer(formData);
      }
      setFormData({ name: '', slogan: '', description: '', status: 'Activo' });
      await fetchProducers();
      Swal.fire('¡Éxito!', 'Productora guardada correctamente.', 'success');
    } catch (err) {
      setError('Error al guardar la productora');
      Swal.fire('Error', 'No se pudo guardar la productora.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (producer) => {
    setFormData({
      name: producer.name,
      slogan: producer.slogan || '',
      description: producer.description || '',
      status: producer.status,
    });
    setEditId(producer._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar esta productora?',
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
        await deleteProducer(id);
        await fetchProducers();
        Swal.fire('¡Eliminado!', 'La productora ha sido eliminada.', 'success');
      } catch (err) {
        setError('Error al eliminar la productora');
        Swal.fire('Error', 'No se pudo eliminar la productora.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className={styles.producersContainer}>Cargando...</div>;
  if (error) return <div className={styles.producersContainer}>{error}</div>;

  return (
    <div className="container">
      <div className={styles.producersContainer}>
        <h1 className="mb-4 text-center">Gestión de Productoras</h1>

        {/* Formulario de creación */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row g-3">
            <div className="col-md-3">
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
            <div className="col-md-3">
              <label htmlFor="slogan" className={`form-label ${styles.formLabel}`}>
                Slogan
              </label>
              <input
                type="text"
                className="form-control"
                id="slogan"
                name="slogan"
                value={formData.slogan}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
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
            <div className="col-md-1 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                {editId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </form>

        {/* Lista de productoras */}
        <div className="table-responsive">
          <table className={`table table-striped ${styles.table}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Slogan</th>
                <th>Descripción</th>
                <th>Estado</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {producers.length > 0 ? (
                producers.map((producer) => (
                  <tr key={producer._id}>
                    <td>{producer.name}</td>
                    <td>{producer.slogan || 'Sin slogan'}</td>
                    <td>{producer.description || 'Sin descripción'}</td>
                    <td>{producer.status}</td>
                    <td>
                      {producer.createdAt
                        ? new Date(producer.createdAt).toLocaleDateString()
                        : 'Sin fecha'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(producer)}
                        data-bs-toggle="tooltip"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(producer._id)}
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
                  <td colSpan={6} className="text-center">
                    No hay productoras disponibles
                  </td>
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
                  <h5 className={`modal-title ${styles.modalTitle}`}>Editar Productora</h5>
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
                      <label htmlFor="editSlogan" className={`form-label ${styles.formLabel}`}>
                        Slogan
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="editSlogan"
                        name="slogan"
                        value={formData.slogan}
                        onChange={handleInputChange}
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

export default ProducersPage;