import { spawn } from 'redux-saga/effects';

import watchAuth from './auth';
import watchCustomers from './customers';
import watchLocations from './locations';
import watchStatistics from './statistics';

export default function* root() {
    yield spawn(watchAuth);
    yield spawn(watchCustomers);
    yield spawn(watchLocations);
    yield spawn(watchStatistics);
}
