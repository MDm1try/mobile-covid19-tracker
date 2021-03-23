const createActionConstants = (type: string): ActionTypes => ({
    REQUEST: `${type}.REQUEST`,
    SUCCESS: `${type}.SUCCESS`,
    FAILURE: `${type}.FAILURE`,
});

export default createActionConstants;
