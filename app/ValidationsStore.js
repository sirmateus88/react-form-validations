import { createStore } from 'redux';
//-----------------ACTION TYPES ---------------------------
const UPDATE_STATUS = 'UPDATE_STATUS';
const ADD_VALIDATION = 'ADD_VALIDATION';
const CLEAR_VALIDATION = 'CLEAR_VALIDATION';
const GOT_ERRORS = 'GOT_ERRORS';
const CLEAR_ERRORS = 'CLEAR_ERRORS';


//-----------------ACTION CREATORS ---------------------------
export const updateStatus = (field, status) => {
  return {
      type: UPDATE_STATUS,
      objStatus: {
        name: field,
        status
      }
  };
};

export const addValidation = (objValidation) => {
  return {
      type: ADD_VALIDATION,
      objValidation
  };
};

export const clearValidation = () => {
  return {
      type: CLEAR_VALIDATION
  };
};

export const gotErrors = (name, errors) => {
  return {
    type: GOT_ERRORS,
    errorObj: {
      name,
      errors
    }
  };
};

export const clearErrors = (name) => {
  return {
    type: CLEAR_ERRORS,
    name
  };
};


//-----------------INITIAL STATE ---------------------------

const initialState = {
  formStatus: [],
  validations: [],
  stateChanged: [],
  errors: []
};

//-----------------REDUCERS ---------------------------

function reducer (prevState = initialState, action){
  switch (action.type) {
    case UPDATE_STATUS:
      return Object.assign({}, prevState, {formStatus: [...prevState.formStatus.filter(elem => elem.name !== action.objStatus.name), action.objStatus],
        stateChanged: [...prevState.stateChanged.filter(elem => elem !== action.objStatus.name), action.objStatus.name]});
    case ADD_VALIDATION:
      return Object.assign({}, prevState, {validations: [...prevState.validations, action.objValidation]})
      case GOT_ERRORS:
        return Object.assign({}, prevState, {errors: [...prevState.errors.filter(elem => elem.name !== action.errorObj.name), action.errorObj]});
      case CLEAR_ERRORS:
      return Object.assign({}, prevState, {errors: [...prevState.errors.filter(elem => elem.name !== action.name), {name: action.name, errors: []}]});
    case CLEAR_VALIDATION:
        return Object.assign({}, initialState);
    default:
      return prevState;
  }
}

export default createStore(reducer);
