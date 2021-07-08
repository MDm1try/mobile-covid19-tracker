import { STATISTICS } from '../actions';
import StatisticsActionTypes from '../actionTypes/StatisticsActionTypes';

const initialState = {
    countInfectedCustomers: 0,
    countHealthyCustomers: 0,
    countVaccinatedCustomers: 0,
    countRecoveredCustomers: 0,
    countPossiblyInfectedCustomers: 0,
    countLocations: 0,
    isLoading: false,
};

const statisticsReducer = (state = initialState, action: StatisticsActionTypes) => {
    switch (action.type) {
        case STATISTICS.GET.SUCCESS: {
            return {
                ...state,
                ...action.payload,
                isLoading: false,
            };
        }
        case STATISTICS.GET.FAILURE: {
            return {
                ...state,
                isLoading: true,
            };
        }
        case STATISTICS.GET.REQUEST: {
            return {
                ...state,
                isLoading: true,
            };
        }

        default:
            return state;
    }
};

export default statisticsReducer;
