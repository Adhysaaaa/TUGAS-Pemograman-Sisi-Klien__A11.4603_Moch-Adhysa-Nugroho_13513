import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Home.css';
import { useDispatch, useSelector } from 'react-redux';
import { setEditIndex, deleteMobil } from './actions';
import { getAllMobil } from './apiClient';

function Home() {
  const dispatch = useDispatch();
  const dataMobil = useSelector((state) => state.dataMobil);

  useEffect(() => {
    getAllMobil()
      .then(data => {
        dispatch({ type: 'SET_MOBIL', payload: data });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, [dispatch]);

  const handleEdit = (id) => {
    dispatch(setEditIndex(id));
  };

  const handleDelete = (id) => {
    deleteMobil(id)
      .then(() => {
        dispatch(deleteMobil(id));
      })
      .catch(error => {
        console.error('Error deleting mobil:', error);
      });
  };

  return (
    <div>
      <header className="hero-section">
        <div className="hero-content text-center">
          <h1>Welcome to Jual Mobil Bekas</h1>
          <p>Find the best deals on used cars</p>
          <Link to="/form" className="btn btn-primary btn-lg">Tambah Mobil</Link>
        </div>
      </header>
      <div className="container mt-5">
        <h2 className="text-center mb-4">Data Mobil</h2>
        <div className="row">
          {dataMobil.map((mobil) => (
            <div className="col-md-4 mb-4" key={mobil.id}>
              <div className="card shadow-sm h-100 hover-zoom">
                {mobil.multipleGambar && mobil.multipleGambar.length > 0 && (
                  <div id={`carousel-${mobil.id}`} className="carousel slide" data-ride="carousel">
                    <div className="carousel-inner">
                      {mobil.multipleGambar.map((gambar, idx) => (
                        <div key={idx} className={`carousel-item ${idx === 0 ? 'active' : ''}`}>
                          <img
                            src={gambar}
                            className="d-block w-100"
                            alt={`Slide ${idx}`}
                            style={{ maxHeight: '200px', objectFit: 'cover' }}
                          />
                        </div>
                      ))}
                    </div>
                    <a className="carousel-control-prev" href={`#carousel-${mobil.id}`} role="button" data-slide="prev">
                      <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                      <span className="sr-only">Previous</span>
                    </a>
                    <a className="carousel-control-next" href={`#carousel-${mobil.id}`} role="button" data-slide="next">
                      <span className="carousel-control-next-icon" aria-hidden="true"></span>
                      <span className="sr-only">Next</span>
                    </a>
                  </div>
                )}
                <div className="card-body">
                  <h5 className="card-title">{mobil.nama}</h5>
                  <p className="card-text">Pabrikan: {mobil.pabrikan}</p>
                  <p className="card-text">Tipe: {mobil.tipe}</p>
                  <p className="card-text">Tahun: {mobil.tahun}</p>
                  <p className="card-text">Harga: {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(mobil.harga)}</p>
                  <div className="d-flex justify-content-between mt-3">
                    <Link className="btn btn-warning btn-sm" to="/form" onClick={() => handleEdit(mobil.id)}>Edit</Link>
                    <button className="btn btn-danger btn-sm" onClick={() => handleDelete(mobil.id)}>Delete</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <footer className="footer bg-dark text-light text-center p-3 mt-5">
        <p>Created by Moch Adhysa Nugroho - A11.2021.13513</p>
      </footer>
    </div>
  );
}

export default Home;
