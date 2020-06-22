import generalReducer from './general';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
    general: generalReducer
});

export default rootReducer;