import userReducer from './userReducer';
import petReducer from './petReducer';
import { combineReducers } from 'redux';

const allReducers = combineReducers({
  user: userReducer,
  pet: petReducer
});

export default allReducers;