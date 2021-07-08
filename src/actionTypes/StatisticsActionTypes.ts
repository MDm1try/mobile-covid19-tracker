import { STATISTICS } from '../actions';

export interface GetStatisticsRequestAction {
    type: typeof STATISTICS.GET.REQUEST;
    payload: undefined;
}

export interface GetStatisticsSuccessAction {
    type: typeof STATISTICS.GET.SUCCESS;
    payload: Statistics;
}

type StatisticsActionTypes = GetStatisticsSuccessAction | GetStatisticsRequestAction;

export default StatisticsActionTypes;
