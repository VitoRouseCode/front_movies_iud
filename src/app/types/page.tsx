// app/types/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import styles from './types.module.css';
import { getTypes, createType, updateType, deleteType } from '../../../services/types';
import Swal from 'sweetalert2';

const TypesPage = () => {
  const [types, setTypes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({ name: '', description: '' });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const fetchTypes = async () => {
    try {
      const data = await getTypes();
      setTypes(data);
    } catch (err) {
      setError('No se pudieron cargar los tipos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTypes();
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
        await updateType(editId, formData);
        setEditId(null);
        setShowModal(false);
      } else {
        await createType(formData);
      }
      setFormData({ name: '', description: '' });
      await fetchTypes();
      Swal.fire('¡Éxito!', 'Tipo guardado correctamente.', 'success');
    } catch (err) {
      setError('Error al guardar el tipo');
      Swal.fire('Error', 'No se pudo guardar el tipo.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (type) => {
    setFormData({ name: type.name, description: type.description || '' });
    setEditId(type._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar este tipo?',
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
        await deleteType(id);
        await fetchTypes();
        Swal.fire('¡Eliminado!', 'El tipo ha sido eliminado.', 'success');
      } catch (err) {
        setError('Error al eliminar el tipo');
        Swal.fire('Error', 'No se pudo eliminar el tipo.', 'error');
      } finally {
        setLoading(false);
      }
    }
  };

  if (loading) return <div className={styles.typesContainer}>Cargando...</div>;
  if (error) return <div className={styles.typesContainer}>{error}</div>;

  return (
    <div className="container">
      <div className={styles.typesContainer}>
        <h1 className="mb-4 text-center">Gestión de Tipos de Contenido</h1>

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
            <div className="col-md-6">
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
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                {editId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </form>

        {/* Lista de tipos */}
        <div className="table-responsive">
          <table className={`table table-striped ${styles.table}`}>
            <thead>
              <tr>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {types.length > 0 ? (
                types.map((type) => (
                  <tr key={type._id}>
                    <td>{type.name}</td>
                    <td>{type.description || 'Sin descripción'}</td>
                    <td>
                      {type.createdAt
                        ? new Date(type.createdAt).toLocaleDateString()
                        : 'Sin fecha'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(type)}
                        data-bs-toggle="tooltip"
                        title="Editar"
                      >
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(type._id)}
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
                  <td colSpan={4} className="text-center">
                    No hay tipos disponibles
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
                  <h5 className={`modal-title ${styles.modalTitle}`}>Editar Tipo</h5>
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

export default TypesPage;