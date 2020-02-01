import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';

export const purchaseBugerSuccess = (id, orderData) => {
    console.log('id', id)
    console.log('dtaor', orderData)
    return {
        type: actionTypes.PURCHASE_BUGER_SUCCESS,
        orderId: id,
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
            dispatch(purchaseBugerSuccess(res.data.name, orderData))
        } )
        .catch( error => {
            dispatch(purchaseBugerfailed(error))
        });
    };
};

export const purchaseInit = () => {
    return {
        type: actionTypes.PURSHASE_INIT 
       }
};