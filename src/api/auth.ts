import httpClient from './httpClient';
import * as actions from '../actionTypes/AuthActionTypes';

export const registerUserService = (data: actions.RegistrationRequestAction['payload']) => {
    const API_ENDPOINT = '/api/v1/auth/registration';
    return httpClient.post(API_ENDPOINT, data);
};

export const loginUserService = (data: actions.LoginRequestAction['payload']) => {
    const API_ENDPOINT = '/api/v1/auth/login';
    return httpClient.post(API_ENDPOINT, data);
};
