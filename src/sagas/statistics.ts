import { takeLatest, call, put } from 'redux-saga/effects';
import { Toast } from 'native-base';

import { STATISTICS } from '../actions';
import * as api from '../api';

function* getStatisticsSaga() {
    try {
        const { data } = yield call(api.getStatisticsService);
        yield put({ type: STATISTICS.GET.SUCCESS, payload: data });
    } catch (err) {
        console.error(err);
        Toast.show({
            text: err.response ? err.response.data.error : err.message,
            buttonText: 'Okay',
            type: 'danger',
        });
        yield put({ type: STATISTICS.GET.FAILURE, payload: err.message });
    }
}

export default function* watchSagas() {
    yield takeLatest(STATISTICS.GET.REQUEST, getStatisticsSaga);
}
