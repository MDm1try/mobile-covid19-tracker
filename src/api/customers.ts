import httpClient from './httpClient';
import qs from 'qs';
import * as actions from '../actionTypes/CustomersActionTypes';

export const getCustomersService = (obj: { name?: string }) => {
    const str = qs.stringify(obj);
    const API_ENDPOINT = '/api/v1/secure/customers?' + str;
    return httpClient.get(API_ENDPOINT);
};

export const getCustomerByIdService = (id: string) => {
    const API_ENDPOINT = `/api/v1/secure/customers/${id}`;
    return httpClient.get(API_ENDPOINT);
};

export const updateCustomerStatusesByIdService = (data: actions.UpdateCustomerStatusByIdRequestAction['payload']) => {
    const API_ENDPOINT = `/api/v1/secure/customers/${data.userId}/statuses/${data._id}`;
    return httpClient.put(API_ENDPOINT, data);
};
