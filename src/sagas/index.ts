import { spawn } from 'redux-saga/effects';

import watchAuth from './auth';
import watchCustomers from './customers';

export default function* root() {
    yield spawn(watchAuth);
    yield spawn(watchCustomers);
}
