import React, { createContext, useState, useContext, useCallback } from 'react';

const DataContext = createContext();

export function useDataContext() {
  return useContext(DataContext);
}

export function DataProvider({ children }) {
  const [dataMobil, setDataMobil] = useState([]);
  const [editIndex, setEditIndex] = useState(null);

  const handleSubmit = useCallback((mobil) => {
    setDataMobil((prevData) => {
      if (editIndex !== null) {
        return prevData.map((item, index) => (index === editIndex ? mobil : item));
      } else {
        return [...prevData, mobil];
      }
    });
    setEditIndex(null);
  }, [editIndex]);

  const handleDelete = useCallback((index) => {
    setDataMobil((prevData) => prevData.filter((_, i) => i !== index));
  }, []);

  const handleEdit = useCallback((index) => {
    setEditIndex(index);
  }, []);

  return (
    <DataContext.Provider
      value={{
        dataMobil,
        editIndex,
        handleSubmit,
        handleDelete,
        handleEdit,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
