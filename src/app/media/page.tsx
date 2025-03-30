// app/media/page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import styles from './media.module.css';
import {
  getMedia,
  createMedia,
  updateMedia,
  deleteMedia,
} from '../../../services/media';
import {
  getGenresForSelect,
  getDirectorsForSelect,
  getProducersForSelect,
  getTypesForSelect,
} from '../../../services/optionsSelect';
import Swal from 'sweetalert2';

const MediaPage = () => {
  const [media, setMedia] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    serial: '',
    title: '',
    synopsis: '',
    url: '',
    image: '',
    releaseYear: '',
    genre: '',
    director: '',
    producer: '',
    type: '',
  });
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Estados para los datos de los selects
  const [genres, setGenres] = useState([]);
  const [directors, setDirectors] = useState([]);
  const [producers, setProducers] = useState([]);
  const [types, setTypes] = useState([]);

  // Cargar datos para los selects y los medios
  const fetchData = async () => {
    try {
      setLoading(true);
      const [mediaData, genresData, directorsData, producersData, typesData] = await Promise.all([
        getMedia(),
        getGenresForSelect(),
        getDirectorsForSelect(),
        getProducersForSelect(),
        getTypesForSelect(),
      ]);
      setMedia(mediaData);
      setGenres(genresData);
      setDirectors(directorsData);
      setProducers(producersData);
      setTypes(typesData);
    } catch (err) {
      setError('No se pudieron cargar los datos');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const mediaData = {
        ...formData,
        releaseYear: parseInt(formData.releaseYear), // Convertir a número
      };
      if (editId) {
        await updateMedia(editId, mediaData);
        setEditId(null);
        setShowModal(false);
      } else {
        await createMedia(mediaData);
      }
      setFormData({
        serial: '',
        title: '',
        synopsis: '',
        url: '',
        image: '',
        releaseYear: '',
        genre: '',
        director: '',
        producer: '',
        type: '',
      });
      await fetchData();
      Swal.fire('¡Éxito!', 'Contenido guardado correctamente.', 'success');
    } catch (err) {
      setError('Error al guardar el contenido');
      Swal.fire('Error', 'No se pudo guardar el contenido.', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (mediaItem) => {
    setFormData({
      serial: mediaItem.serial,
      title: mediaItem.title,
      synopsis: mediaItem.synopsis,
      url: mediaItem.url,
      image: mediaItem.image || '',
      releaseYear: mediaItem.releaseYear.toString(),
      genre: mediaItem.genre?._id || mediaItem.genre || '',
      director: mediaItem.director?._id || mediaItem.director || '',
      producer: mediaItem.producer?._id || mediaItem.producer || '',
      type: mediaItem.type?._id || mediaItem.type || '',
    });
    setEditId(mediaItem._id);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: '¿Seguro que desea eliminar este contenido?',
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
        await deleteMedia(id);
        await fetchData();
        Swal.fire('¡Eliminado!', 'El contenido ha sido eliminado.', 'success');
      } catch (err) {
        setError('Error al eliminar el contenido');
        Swal.fire('Error', 'No se pudo eliminar el contenido.', 'error');
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
      <p className="mt-3" style={{ color: '#FFFFFF' }}>Cargando medias...</p>
    </div>
  );
  if (error) return <div className={styles.mediaContainer}>{error}</div>;

  return (
    <div className="container">
      <div className={styles.mediaContainer}>
        <h1 className="mb-4 text-center">Gestión de Contenido Multimedia</h1>

        {/* Formulario de creación */}
        <form onSubmit={handleSubmit} className="mb-5">
          <div className="row g-3">
            <div className="col-md-3">
              <label htmlFor="serial" className={`form-label ${styles.formLabel}`}>
                Serial
              </label>
              <input
                type="text"
                className="form-control"
                id="serial"
                name="serial"
                value={formData.serial}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="title" className={`form-label ${styles.formLabel}`}>
                Título
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="synopsis" className={`form-label ${styles.formLabel}`}>
                Sinopsis
              </label>
              <input
                type="text"
                className="form-control"
                id="synopsis"
                name="synopsis"
                value={formData.synopsis}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="url" className={`form-label ${styles.formLabel}`}>
                URL
              </label>
              <input
                type="text"
                className="form-control"
                id="url"
                name="url"
                value={formData.url}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="image" className={`form-label ${styles.formLabel}`}>
                Imagen (URL)
              </label>
              <input
                type="text"
                className="form-control"
                id="image"
                name="image"
                value={formData.image}
                onChange={handleInputChange}
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="releaseYear" className={`form-label ${styles.formLabel}`}>
                Año de Estreno
              </label>
              <input
                type="number"
                className="form-control"
                id="releaseYear"
                name="releaseYear"
                value={formData.releaseYear}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="col-md-3">
              <label htmlFor="genre" className={`form-label ${styles.formLabel}`}>
                Género
              </label>
              <select
                className="form-select"
                id="genre"
                name="genre"
                value={formData.genre}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un género</option>
                {genres.map((genre) => (
                  <option key={genre.value} value={genre.value}>
                    {genre.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="director" className={`form-label ${styles.formLabel}`}>
                Director
              </label>
              <select
                className="form-select"
                id="director"
                name="director"
                value={formData.director}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un director</option>
                {directors.map((director) => (
                  <option key={director.value} value={director.value}>
                    {director.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="producer" className={`form-label ${styles.formLabel}`}>
                Productora
              </label>
              <select
                className="form-select"
                id="producer"
                name="producer"
                value={formData.producer}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione una productora</option>
                {producers.map((producer) => (
                  <option key={producer.value} value={producer.value}>
                    {producer.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-3">
              <label htmlFor="type" className={`form-label ${styles.formLabel}`}>
                Tipo
              </label>
              <select
                className="form-select"
                id="type"
                name="type"
                value={formData.type}
                onChange={handleInputChange}
                required
              >
                <option value="">Seleccione un tipo</option>
                {types.map((type) => (
                  <option key={type.value} value={type.value}>
                    {type.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 d-flex align-items-end">
              <button type="submit" className="btn btn-primary w-100">
                {editId ? 'Actualizar' : 'Crear'}
              </button>
            </div>
          </div>
        </form>

        {/* Lista de medios */}
        <div className="table-responsive">
          <table className={`table table-striped ${styles.table}`}>
            <thead>
              <tr>
                <th>Serial</th>
                <th>Título</th>
                <th>Sinopsis</th>
                <th>URL</th>
                <th>Año</th>
                <th>Género</th>
                <th>Director</th>
                <th>Productora</th>
                <th>Tipo</th>
                <th>Creado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {media.length > 0 ? (
                media.map((item) => (
                  <tr key={item._id}>
                    <td>{item.serial}</td>
                    <td>{item.title}</td>
                    <td>{item.synopsis}</td>
                    <td>
                      <a style={{color:'black'}} href={item.url} target="_blank" rel="noopener noreferrer">
                        {item.url} <i className="bi bi-box-arrow-up-right"></i>
                      </a>
                    </td>
                    <td>{item.releaseYear}</td>
                    <td>{item.genre?.name || 'Sin género'}</td>
                    <td>{item.director?.names || 'Sin director'}</td>
                    <td>{item.producer?.name || 'Sin productora'}</td>
                    <td>{item.type?.name || 'Sin tipo'}</td>
                    <td>
                      {item.createdAt
                        ? new Date(item.createdAt).toLocaleDateString()
                        : 'Sin fecha'}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(item)}
                        data-bs-toggle="tooltip"
                        title="Editar"
                      >
                       <i className="bi bi-pencil"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(item._id)}
                        data-bs-toggle="tooltip"
                        data-bs-placement="top"
                        title="Eliminar"
                      >
                        <i  className="bi bi-trash"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={11} className="text-center">
                    No hay contenido multimedia disponible
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Modal para edición */}
        {showModal && (
          <div className="modal fade show d-block" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-lg">
              <div className={`modal-content ${styles.modalContent}`}>
                <div className={`modal-header ${styles.modalHeader}`}>
                  <h5 className={`modal-title ${styles.modalTitle}`}>Editar Contenido</h5>
                  <button
                    type="button"
                    className={`btn-close ${styles.btnClose}`}
                    onClick={() => setShowModal(false)}
                  ></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    <div className="row g-3">
                      <div className="col-md-6">
                        <label htmlFor="editSerial" className={`form-label ${styles.formLabel}`}>
                          Serial
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editSerial"
                          name="serial"
                          value={formData.serial}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editTitle" className={`form-label ${styles.formLabel}`}>
                          Título
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editTitle"
                          name="title"
                          value={formData.title}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editSynopsis" className={`form-label ${styles.formLabel}`}>
                          Sinopsis
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editSynopsis"
                          name="synopsis"
                          value={formData.synopsis}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editUrl" className={`form-label ${styles.formLabel}`}>
                          URL
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editUrl"
                          name="url"
                          value={formData.url}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editImage" className={`form-label ${styles.formLabel}`}>
                          Imagen (URL)
                        </label>
                        <input
                          type="text"
                          className="form-control"
                          id="editImage"
                          name="image"
                          value={formData.image}
                          onChange={handleInputChange}
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editReleaseYear" className={`form-label ${styles.formLabel}`}>
                          Año de Estreno
                        </label>
                        <input
                          type="number"
                          className="form-control"
                          id="editReleaseYear"
                          name="releaseYear"
                          value={formData.releaseYear}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editGenre" className={`form-label ${styles.formLabel}`}>
                          Género
                        </label>
                        <select
                          className="form-select"
                          id="editGenre"
                          name="genre"
                          value={formData.genre}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione un género</option>
                          {genres.map((genre) => (
                            <option key={genre.value} value={genre.value}>
                              {genre.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editDirector" className={`form-label ${styles.formLabel}`}>
                          Director
                        </label>
                        <select
                          className="form-select"
                          id="editDirector"
                          name="director"
                          value={formData.director}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione un director</option>
                          {directors.map((director) => (
                            <option key={director.value} value={director.value}>
                              {director.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editProducer" className={`form-label ${styles.formLabel}`}>
                          Productora
                        </label>
                        <select
                          className="form-select"
                          id="editProducer"
                          name="producer"
                          value={formData.producer}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione una productora</option>
                          {producers.map((producer) => (
                            <option key={producer.value} value={producer.value}>
                              {producer.label}
                            </option>
                          ))}
                        </select>
                      </div>
                      <div className="col-md-6">
                        <label htmlFor="editType" className={`form-label ${styles.formLabel}`}>
                          Tipo
                        </label>
                        <select
                          className="form-select"
                          id="editType"
                          name="type"
                          value={formData.type}
                          onChange={handleInputChange}
                          required
                        >
                          <option value="">Seleccione un tipo</option>
                          {types.map((type) => (
                            <option key={type.value} value={type.value}>
                              {type.label}
                            </option>
                          ))}
                        </select>
                      </div>
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

export default MediaPage;