import { combineReducers } from 'redux';
import auth from './auth';
import customers from './customers';
import locations from './locations';
import notifications from './notifications';

const rootReducer = combineReducers({
    auth,
    customers,
    locations,
    notifications,
});

export default rootReducer;
