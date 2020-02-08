import * as actionsTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionsTypes.AUTH_START
    };
}

export const authSuccess= (authData) => {
    return {
        type: actionsTypes.AUTH_SUCCESS,
        authData : authData
    };
};

export const authFail= (error) => {
    return {
        type: actionsTypes.AUTH_FAIL,
        error: error
    };
};

export const auth= (email, password, isSignUp) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            password: password,
            email: email,
            returnSecureTocken: true,
        };
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyA_tCIAQno5okEmPO4tz1EHeMVTQ-AIQ0o';
        if (!isSignUp) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyA_tCIAQno5okEmPO4tz1EHeMVTQ-AIQ0o';
        }
        axios.post(url, authData)
        .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data))
        })
        .catch(err => {
            console.log(err);
            dispatch(authFail);
        })
    };
};

