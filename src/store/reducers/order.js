import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utillity'

const initalState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURSHASE_INIT:
            return updateObject(state, {purchased: false});
        case actionTypes.PURCHASE_BUGER_START:
             return updateObject(state, {loading: false});
        case actionTypes.PURCHASE_BUGER_SUCCESS:
            const newOrder = updateObject(action.orderData, {id: action.orderId});
            return updateObject(state, {  loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)});
        case actionTypes.PURCHASE_BUGER_FAILED:
            return updateObject(state, {loading: false});
        case actionTypes.FETCH_ORDER_START:
            return updateObject(state, {loading: true});
        case actionTypes.FETCH_ORDER_SUCCESS:
            return updateObject(state, {
                orders: action.orders,
                loading: false
            });
        case actionTypes.FETCH_ORDER_FAILED:
            return updateObject(state, {loading: false});
        default:
            return state    
    }
};

export default reducer