import createActionConstants from '../utils/createActionConstants';

export const AUTH = {
    LOGIN: createActionConstants('AUTH.LOGIN'),
    LOGOUT: createActionConstants('AUTH.LOGOUT'),
    REGISTRATION: createActionConstants('AUTH.REGISTRATION'),
};

export const CUSTOMERS = {
    GET_ALL: createActionConstants('CUSTOMERS.GET_ALL'),
    GET_BY_ID: createActionConstants('CUSTOMERS.GET_BY_ID'),
    UPDATE_STATUS_BY_ID: createActionConstants('CUSTOMERS.UPDATE_STATUS_BY_ID'),
};
