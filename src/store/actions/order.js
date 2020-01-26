import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBugerSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_BUGER_SUCCESS,
        id: id,
        orderData: orderData
    }
};

export const purchaseBugerfailed = (error) => {
    return {
        type: actionTypes.PURCHASE_BUGER_FAILED,
        error: error
    }
};
export const purchaseBugerStart = () => {
    return {
        type: actionTypes.PURCHASE_BUGER_START,

    }
}

export const purchaseBuger = (orderData) => {
    return dispatch => {
        dispatch(purchaseBugerStart());
        axios.post( '/orders.json', orderData )
        .then( res => {
            console.log(res.data)
            dispatch(purchaseBugerSuccess(res.data, orderData))
        } )
        .catch( error => {
            dispatch(purchaseBugerfailed(error))
        });
    };
};