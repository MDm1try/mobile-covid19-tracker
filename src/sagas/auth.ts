import { takeLatest, call, put } from 'redux-saga/effects';
import { Toast } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { navigate } from '../RootNavigation';
import { AUTH } from '../actions';
import * as api from '../api';
import * as actions from '../actionTypes/AuthActionTypes';

function* registration(action: actions.RegistrationRequestAction) {
    try {
        yield call(api.registerUserService, action.payload);
        yield put({ type: AUTH.REGISTRATION.SUCCESS });
        navigate('registration_successful');
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: AUTH.REGISTRATION.FAILURE, payload: err.message });
    }
}

function* login(action: actions.LoginRequestAction) {
    try {
        const { data } = yield call(api.loginUserService, action.payload);

        yield AsyncStorage.setItem('jwtToken', data.jwtToken);
        const payload = {
            _id: data._id,
            firstName: data.firstName,
            lastName: data.lastName,
            email: data.email,
            dob: data.dob,
            type: data.type,
        };
        yield put({ type: AUTH.LOGIN.SUCCESS, payload });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: AUTH.LOGIN.FAILURE, payload: err.message });
    }
}

export default function* watchSagas() {
    yield takeLatest(AUTH.REGISTRATION.REQUEST, registration);
    yield takeLatest(AUTH.LOGIN.REQUEST, login);
}
