type ActionTypes = {
    REQUEST: string;
    SUCCESS: string;
    FAILURE: string;
};

type Action<P> = {
    type: string;
    payload: P;
};
