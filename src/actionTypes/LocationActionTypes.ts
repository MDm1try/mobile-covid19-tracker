import { LOCATIONS } from '../actions';

export interface AddLocationRequestAction {
    type: typeof LOCATIONS.ADD;
    payload: {
        name: string;
        radius: number;
        latitude: number;
        longitude: number;
    };
}

export interface GetAllLocationsRequestAction {
    type: typeof LOCATIONS.GET_ALL.REQUEST;
    payload: {
        name?: string;
    };
}

export interface GetLocationByIdRequestAction {
    type: typeof LOCATIONS.GET_BY_ID.REQUEST;
    payload: string;
}

export interface RemoveLocationByIdRequestAction {
    type: typeof LOCATIONS.GET_BY_ID.REQUEST;
    payload: string;
}

export interface TrackLocationRequestAction {
    type: typeof LOCATIONS.TRACK.REQUEST;
    payload: {
        latitude: number;
        longitude: number;
        timestamp: number;
        accuracy: number;
    };
}

type LocationActionTypes =
    | AddLocationRequestAction
    | GetAllLocationsRequestAction
    | GetLocationByIdRequestAction
    | RemoveLocationByIdRequestAction
    | TrackLocationRequestAction;

export default LocationActionTypes;
