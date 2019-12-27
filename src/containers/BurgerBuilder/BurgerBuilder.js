import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Buger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';  
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';

const INGREDIENTS_PRICES = {
    salad: 5,
    meat: 3,
    bacon: 7,
    cheese: 1,
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        // ingredients: {
        //     salad: 0,
        //     bacon: 0,
        //     cheese: 0,
        //     meat: 0
        // },
        totalPrice: 4,
        purchasable: false,
        purchasing: false,
        loading: false,
        errorState: false,
    };

    componentWillMount() {
        axios.get('https://burger-react-64de4.firebaseio.com/ingredients.json')
            .then(res => {
                this.setState({ ingredients: res.data })
            })
            .catch(err => {
                // this.setState({ errorState: true })
                let ingredients = {
                    salad: 0,
                    bacon: 0,
                    cheese: 0,
                    meat: 0
                };
                this.setState({ ingredients: ingredients });

            });
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
   
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        const queryParmas = [];
        for (let i in this.state.ingredients) {
            queryParmas.push(encodeURIComponent(i) + '=' + encodeURIComponent(this.state.ingredients[i]));
        }
        queryParmas.push('price='+ this.state.totalPrice)
        const queryString = queryParmas.join('&');
        this.props.history.push(
            // pathName
            '/checkout?' + queryString ,
            // search : '/checkout?' + queryString 
        );
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

        let orderSummary = null;
        let burger = this.state.errorState ? 
        <p>ingredients can't be loaded </p> : <Spinner />;

        if (this.state.ingredients !== null) {
            burger = (
                <Aux>
                    <Burger ingredients={this.state.ingredients} />
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
            orderSummary = <OrderSummary
                ingredients={this.state.ingredients}
                price={this.state.totalPrice}
                modalClosed={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />
        }
        if (this.state.loading) {
            orderSummary = <Spinner />
        }


        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        )
    }
}

export default WithErrorHandler(BurgerBuilder, axios);