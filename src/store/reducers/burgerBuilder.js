import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utillity'; 

const INITIAL_STATE = {
    ingredients: {},
    totalPrice: 3,
    error: false,   
};

const INGREDIENTS_PRICES = {
    salad: 1.2,
    meat: 3,
    bacon: 2.2,
    cheese: 0.1,
};

const reducer = (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case actionTypes.ADD_INGREDIENT:
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedState)
        case actionTypes.REMOVE_INGREDIENT:
            const updatedIng = {[action.ingredientName]: state.ingredients[action.ingredientName] - 1};
            const updatedIngs = updateObject(state.ingredients, updatedIng);
            const updatedSt = {
                ingredients: updatedIngs,
                totalPrice: state.totalPrice + INGREDIENTS_PRICES[action.ingredientName]
            };
            return updateObject(state, updatedSt)
        case actionTypes.SET_INGREDIENTS:
            return updateObject(state, {
                ingredients: {
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat,
                },
                totalPrice: 3,
                error: false
            })
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return updateObject(state, {error: true})
        default:
            return state;         
    }
};

export default reducer;