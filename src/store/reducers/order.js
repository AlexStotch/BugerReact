import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utillity'

const initalState = {
    orders: [],
    loading: false,
    purchased: false
}

const purchaseInit = (state, action) => {
    return updateObject(state, { purchased: false });
};

const purchaseStart = (state, action) => {
    return updateObject(state, { loading: false });
};

const purchaseSuccess = (state, action) => {
    const newOrder = updateObject(action.orderData, { id: action.orderId });
    return updateObject(state, {
        loading: false,
        purchased: true,
        orders: state.orders.concat(newOrder)
    });
};

const purchaseFailed = (state, action) => {
    return updateObject(state, { loading: false });
};

const fecthOrderStart = (state, action) => {
    return updateObject(state, { loading: true });
};

const fecthOrderSuccess = (state, action) => {
    return updateObject(state, {
        orders: action.orders,
        loading: false
    });
};

const fecthOrderfailed = (state, action) => {
    return updateObject(state, { loading: false });
};

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURSHASE_INIT: return purchaseInit(state, action);
        case actionTypes.PURCHASE_BUGER_START: return purchaseStart(state, action);
        case actionTypes.PURCHASE_BUGER_SUCCESS: return purchaseSuccess(state, action);
        case actionTypes.PURCHASE_BUGER_FAILED: return purchaseFailed(state, action);
        case actionTypes.FETCH_ORDER_START: return fecthOrderStart(state, action)
        case actionTypes.FETCH_ORDER_SUCCESS: return fecthOrderSuccess(state, action)
        case actionTypes.FETCH_ORDER_FAILED: return fecthOrderfailed(state, action)
        default: return state
    }
};

export default reducer