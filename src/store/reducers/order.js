import * as actionTypes from '../actions/actionTypes';

const initalState = {
    orders: [],
    loading: false,
    purchased: false
}

const reducer = (state = initalState, action) => {
    switch (action.type) {
        case actionTypes.PURSHASE_INIT:
            console.log('bordel')
            return {
                ...state,
                purchased: false
            }
        case actionTypes.PURCHASE_BUGER_START:
        return {
            ...state,
            loading: true
        }
        case actionTypes.PURCHASE_BUGER_SUCCESS:
            const newOrder = {
                ...action.orderData,
                id: action.orderId,
            }
            console.log('new', newOrder)
            console.log('orders', state.orders)
            return {
                ...state,
                loading: false,
                purchased: true,
                orders: state.orders.concat(newOrder)
            }
        case actionTypes.PURCHASE_BUGER_FAILED:
            return {
                ...state,
                loading: false
            }
        default:
            return state    
    }
};

export default reducer