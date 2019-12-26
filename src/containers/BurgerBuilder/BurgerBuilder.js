import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Buger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';  
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

const INGREDIENTS_PRICES = {
    salad: 5,
    meat: 3,
    bacon: 7,
    cheese: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            bacon: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
   
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        alert('bravo')
    }

    updatePurchase(ingredients) {
        const sum = Object.keys(ingredients)
            .map(key => {
                return ingredients[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const newCount = this.state.ingredients[type] + 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newCount;   

        const priceAddition = INGREDIENTS_PRICES[type];
        const newPrice = this.state.totalPrice + priceAddition;
        console.log(newPrice);
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchase(updateIngredients);
    };

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return
        }
        const newCount = oldCount - 1;
        const updateIngredients = {...this.state.ingredients};
        updateIngredients[type] = newCount;   

        const priceSoustration = INGREDIENTS_PRICES[type];
        const newPrice = this.state.totalPrice - priceSoustration;
        this.setState({totalPrice: newPrice, ingredients: updateIngredients});
        this.updatePurchase(updateIngredients);
    };

    render() {
        const disableInfos = {
            ...this.state.ingredients
        };
        for (let key in disableInfos) {
            disableInfos[key] = disableInfos[key] <= 0;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    <OrderSummary 
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    modalClosed={this.purchaseCancelHandler}
                    purchaseContinue={this.purchaseContinueHandler}/>
                </Modal>
                <Burger ingredients={this.state.ingredients}/> 
                <BuildControls 
                    ingredientsAdded={this.addIngredientHandler}
                    ingredientsremoved={this.removeIngredientHandler}
                    disableInfos={disableInfos}
                    purchasable={this.state.purchasable}
                    price={this.state.totalPrice}
                    ordered={this.purchaseHandler}
                />
            </Aux>
        )
    }
}

export default BurgerBuilder;