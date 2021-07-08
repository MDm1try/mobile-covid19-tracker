import { combineReducers } from 'redux';
import auth from './auth';
import customers from './customers';
import locations from './locations';
import notifications from './notifications';
import statistics from './statistics';

const rootReducer = combineReducers({
    auth,
    customers,
    locations,
    statistics,
    notifications,
});

export default rootReducer;
