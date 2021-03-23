import { combineReducers } from 'redux';
import auth from './auth';
import customers from './customers';

const rootReducer = combineReducers({
    auth,
    customers,
});

export default rootReducer;
