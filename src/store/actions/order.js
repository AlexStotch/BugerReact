import * as actionTypes from './actionTypes';
import axios from '../../axios-orders';
export const purchaseBugerStart = () => {
    return {
        type: actionTypes.PURCHASE_BUGER_START,

    }
}

export const purchaseBugerSuccess = (id, orderData) => {
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

export const purchaseBuger = (orderData, token) => {
    return dispatch => {
        dispatch(purchaseBugerStart());
        axios.post( '/orders.json?auth='+ token, orderData )
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

export const fetchOrderStart = () => {
    return {
        type: actionTypes.FETCH_ORDER_START,
    }
}

export const fetchOrderSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDER_SUCCESS,
        orders: orders
    }
};

export const fetchOrderFailed = (error) => {
    return {
        type: actionTypes.FETCH_ORDER_FAILED,
        error: error
    }
};

export const fetchOrders = (token, userId) => {
    return dispatch => {
        dispatch(fetchOrderStart());
        const queryParams ='?auth=' + token + '&orderBy="userId"&equalTo"' + userId + '"';
        axios.get('/orders.json' + queryParams)
        .then(res => {        
            const fetchOrders = [];
            for (let key in res.data) {
                if ("userId" in res.data[key]) {
                    fetchOrders.push({
                        id: key,
                        ...res.data[key]
                    })
                }
            }
            dispatch(fetchOrderSuccess(fetchOrders));
        })
        .catch( error => {
            dispatch(fetchOrderFailed(error))
        });
    };
};