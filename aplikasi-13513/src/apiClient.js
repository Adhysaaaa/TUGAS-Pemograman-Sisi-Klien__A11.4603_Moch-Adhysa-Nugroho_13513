const baseUrl = 'http://localhost:5000';

const handleResponse = (response) => {
  if (!response.ok) {
    throw new Error('Network response was not ok');
  }
  return response.json();
};

const getAllMobil = () => {
  return fetch(`${baseUrl}/mobil`)
    .then(handleResponse)
    .catch(error => {
      console.error('Error fetching data:', error);
      throw error;
    });
};

const addMobil = (mobil) => {
  return fetch(`${baseUrl}/mobil`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mobil),
  })
    .then(handleResponse)
    .catch(error => {
      console.error('Error adding mobil:', error);
      throw error;
    });
};

const updateMobil = (id, mobil) => {
  return fetch(`${baseUrl}/mobil/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(mobil),
  })
    .then(handleResponse)
    .catch(error => {
      console.error('Error updating mobil:', error);
      throw error;
    });
};

const deleteMobil = (id) => {
  return fetch(`${baseUrl}/mobil/${id}`, {
    method: 'DELETE',
  })
    .then(handleResponse)
    .catch(error => {
      console.error('Error deleting mobil:', error);
      throw error;
    });
};

export {
  getAllMobil,
  addMobil,
  updateMobil,
  deleteMobil,
};
