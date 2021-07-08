import httpClient from './httpClient';

export const getStatisticsService = () => {
    const API_ENDPOINT = '/api/v1/secure/statistics';
    return httpClient.get(API_ENDPOINT);
};
