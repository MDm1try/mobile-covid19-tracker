import axios from 'axios';
import { APP_API_BASE_URL } from '@env';
import AsyncStorage from '@react-native-async-storage/async-storage';

const fetchClient = () => {
    const instance = axios.create({
        baseURL: APP_API_BASE_URL,
        headers: {
            'Content-Type': 'application/json',
        },
    });

    instance.interceptors.request.use(async function (config) {
        let token = null;
        try {
            token = (await AsyncStorage.getItem('jwtToken')) as string;
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        } catch (err) {
            console.error(err);
            config.headers.Authorization = null;
        }
        return config;
    });

    return instance;
};

export default fetchClient();
