import React, { useState, useEffect } from 'react';
import { getPhotos, uploadPhoto } from '../services/api';

const PhotoGallery = () => {
    const [photos, setPhotos] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState('all');
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        loadPhotos();
    }, [selectedAlbum]);

    const loadPhotos = async () => {
        try {
            const photosData = await getPhotos(selectedAlbum);
            setPhotos(photosData);
        } catch (error) {
            console.error('Error cargando fotos:', error);
        }
    };

    const handlePhotoUpload = async (event) => {
        const file = event.target.files[0];
        if (!file) return;

        setIsUploading(true);
        try {
            const formData = new FormData();
            formData.append('photo', file);
            formData.append('album', selectedAlbum);

            await uploadPhoto(formData);
            await loadPhotos();
        } catch (error) {
            console.error('Error subiendo foto:', error);
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="gallery-container">
            <div className="gallery-header">
                <h2>Nuestra Galería de Fotos</h2>
                <div className="gallery-controls">
                    <select 
                        value={selectedAlbum}
                        onChange={(e) => setSelectedAlbum(e.target.value)}
                        className="form-select">
                        <option value="all">Todos los álbumes</option>
                        <option value="dates">Citas</option>
                        <option value="trips">Viajes</option>
                        <option value="special">Momentos Especiales</option>
                    </select>
                    <div className="upload-button">
                        <input
                            type="file"
                            id="photo-upload"
                            accept="image/*"
                            onChange={handlePhotoUpload}
                            style={{ display: 'none' }}
                        />
                        <label 
                            htmlFor="photo-upload" 
                            className={`btn btn-primary ${isUploading ? 'disabled' : ''}`}>
                            {isUploading ? 'Subiendo...' : 'Subir Foto'}
                        </label>
                    </div>
                </div>
            </div>

            <div className="photo-grid">
                {photos.map(photo => (
                    <div key={photo._id} className="photo-item">
                        <img src={photo.url} alt={photo.caption} />
                        <div className="photo-overlay">
                            <p>{photo.caption}</p>
                            <small>{new Date(photo.date).toLocaleDateString()}</small>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default PhotoGallery;