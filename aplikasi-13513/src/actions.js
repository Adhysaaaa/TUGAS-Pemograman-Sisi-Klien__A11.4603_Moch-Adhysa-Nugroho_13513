// Action types
export const ADD_MOBIL = 'ADD_MOBIL';
export const UPDATE_MOBIL = 'UPDATE_MOBIL';
export const DELETE_MOBIL = 'DELETE_MOBIL';
export const SET_EDIT_INDEX = 'SET_EDIT_INDEX';

// Action creators
export const addMobil = (mobil) => ({
  type: ADD_MOBIL,
  payload: mobil,
});

export const updateMobil = (index, mobil) => ({
  type: UPDATE_MOBIL,
  payload: { index, mobil },
});

export const deleteMobil = (index) => ({
  type: DELETE_MOBIL,
  payload: index,
});

export const setEditIndex = (index) => ({
  type: SET_EDIT_INDEX,
  payload: index,
});
