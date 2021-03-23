const createAction = <P>(actionConst: ActionTypes) => {
    return (payload?: P) => ({
        type: actionConst.REQUEST,
        payload,
    });
};

export default createAction;
