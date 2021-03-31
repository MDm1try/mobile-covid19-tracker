import qs from 'qs';

import httpClient from './httpClient';
import * as actions from '../actionTypes/LocationActionTypes';

export const addLocationService = (data: actions.AddLocationRequestAction['payload']) => {
    const API_ENDPOINT = '/api/v1/secure/locations';
    return httpClient.post(API_ENDPOINT, data);
};

export const removeLocationByIdService = (id: string) => {
    const API_ENDPOINT = `/api/v1/secure/locations/${id}`;
    return httpClient.delete(API_ENDPOINT);
};

export const getLocationByIdService = (id: string) => {
    const API_ENDPOINT = `/api/v1/secure/locations/${id}`;
    return httpClient.get(API_ENDPOINT);
};

export const getLocationsService = (obj: { name?: string }) => {
    const str = qs.stringify(obj);
    const API_ENDPOINT = '/api/v1/secure/locations?' + str;
    return httpClient.get(API_ENDPOINT);
};

export const trackLocationService = (data: actions.TrackLocationRequestAction['payload']) => {
    const API_ENDPOINT = '/api/v1/secure/locations/track';
    return httpClient.post(API_ENDPOINT, data);
};
