// Initial state
const initialState = {
  dataMobil: [],
  editIndex: null,
};

// Fungsi Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_MOBIL':
      return {
        ...state,
        dataMobil: [...state.dataMobil, action.payload],
      };
    case 'UPDATE_MOBIL':
      return {
        ...state,
        dataMobil: state.dataMobil.map((item, index) =>
          index === action.payload.index ? action.payload.mobil : item
        ),
        editIndex: null,
      };
    case 'DELETE_MOBIL':
      return {
        ...state,
        dataMobil: state.dataMobil.filter((_, index) => index !== action.payload),
      };
    case 'SET_EDIT_INDEX':
      return {
        ...state,
        editIndex: action.payload,
      };
    default:
      return state;
  }
};

export default rootReducer;
