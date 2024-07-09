import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import './FormMobil.css';
import { useDispatch, useSelector } from 'react-redux';
import { addMobil, updateMobil } from './actions';
import { addMobil as addMobilApi, updateMobil as updateMobilApi } from './apiClient';

function FormMobil() {
  const dispatch = useDispatch();
  const editIndex = useSelector((state) => state.editIndex);
  const dataMobil = useSelector((state) => state.dataMobil);
  const [nama, setNama] = useState('');
  const [pabrikan, setPabrikan] = useState('');
  const [tipe, setTipe] = useState('');
  const [tahun, setTahun] = useState('');
  const [harga, setHarga] = useState('');
  const [gambar, setGambar] = useState(null);
  const [multipleGambar, setMultipleGambar] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (editIndex !== null && dataMobil[editIndex]) {
      const { nama, pabrikan, tipe, tahun, harga, multipleGambar } = dataMobil[editIndex];
      setNama(nama || '');
      setPabrikan(pabrikan || '');
      setTipe(tipe || '');
      setTahun(tahun || '');
      setHarga(harga || '');
      setMultipleGambar(multipleGambar || []);
    } else {
      setNama('');
      setPabrikan('');
      setTipe('');
      setTahun('');
      setHarga('');
      setMultipleGambar([]);
    }
  }, [editIndex, dataMobil]);

  const handleFileChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      const selectedFiles = Array.from(files).slice(0, 10);
      const urls = selectedFiles.map(file => URL.createObjectURL(file));
      setMultipleGambar(urls);
      setGambar(selectedFiles[0]);
    } else {
      setMultipleGambar([]);
      setGambar(null);
    }
  };

  const handleSubmitForm = useCallback((e) => {
    e.preventDefault();
    const mobil = { nama, pabrikan, tipe, tahun, harga, gambar, multipleGambar };
    if (editIndex !== null) {
      updateMobilApi(dataMobil[editIndex].id, mobil)
        .then(updatedMobil => {
          dispatch(updateMobil(editIndex, updatedMobil)); // update mobil
        })
        .catch(error => {
          console.error('Error updating mobil:', error);
        });
    } else {
      addMobilApi(mobil)
        .then(addedMobil => {
          dispatch(addMobil(addedMobil)); // tambah mobil
        })
        .catch(error => {
          console.error('Error adding mobil:', error);
        });
    }
    navigate('/');
  }, [nama, pabrikan, tipe, tahun, harga, gambar, multipleGambar, editIndex, dispatch, navigate, dataMobil]);

  const handleImageClick = useCallback((imageUrl) => {
    setGambar(imageUrl);
  }, []);

  return (
    <form onSubmit={handleSubmitForm} className="form-mobil">
      <div className="form-group">
        <label>Nama Mobil</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan nama mobil"
          value={nama}
          onChange={(e) => setNama(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Pabrikan Mobil</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan pabrikan mobil"
          value={pabrikan}
          onChange={(e) => setPabrikan(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Tipe Mobil</label>
        <input
          type="text"
          className="form-control"
          placeholder="Masukkan tipe mobil"
          value={tipe}
          onChange={(e) => setTipe(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Tahun Produksi</label>
        <input
          type="number"
          className="form-control"
          placeholder="Masukkan tahun produksi"
          value={tahun}
          onChange={(e) => setTahun(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Harga Mobil</label>
        <input
          type="number"
          className="form-control"
          placeholder="Masukkan harga mobil"
          value={harga}
          onChange={(e) => setHarga(e.target.value)}
          required
        />
      </div>
      <div className="form-group">
        <label>Gambar Mobil</label>
        <input
          type="file"
          className="form-control"
          onChange={handleFileChange}
          multiple
          accept="image/*"
        />
      </div>
      {multipleGambar.length > 0 && (
        <div className="form-group">
          <label>Pilih Gambar</label>
          <div className="d-flex flex-wrap">
            {multipleGambar.map((imageUrl, index) => (
              <img
                key={index}
                src={imageUrl}
                alt={`Gambar ${index + 1}`}
                className="img-thumbnail m-2"
                style={{ cursor: 'pointer', maxWidth: '150px' }}
                onClick={() => handleImageClick(imageUrl)}
              />
            ))}
          </div>
        </div>
      )}
      <button type="submit" className="btn btn-primary mt-3">
        {editIndex !== null ? 'Update' : 'Submit'}
      </button>
    </form>
  );
}

export default FormMobil;
