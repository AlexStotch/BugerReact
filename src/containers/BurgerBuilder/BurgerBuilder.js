import React, {Component} from 'react'

import Aux from '../../hoc/Aux/Aux'
import Burger from '../../components/Burger/Buger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';  
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import WithErrorHandler from '../../withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
    state = {
        purchasing: false,
        loading: false,
        errorState: false,
    };

    componentWillMount() {
    console.log(this.props)
      this.props.onInitIngredients();
    }

    purchaseHandler = () => {
        this.setState({purchasing: true});
    }
   
    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    }
    
    purchaseContinueHandler = () => {
        this.props.onInitPurchase();
        this.props.history.push('/checkout');
    }

    updatePurchase() {
        const sum = Object.keys(this.props.ings)
            .map(key => {
                return this.props.ings[key];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
      return sum > 0;
    }

    render() {
        const disableInfos = {
            ...this.props.ings
        };
        for (let key in disableInfos) {
            disableInfos[key] = disableInfos[key] <= 0;
        }

        let orderSummary = null;
        let burger = this.props.error ? 
        <p>ingredients can't be loaded </p> : <Spinner />;

        if (Object.keys(this.props.ings).length) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ings} />
                    <BuildControls
                        ingredientsAdded={this.props.onIngredientAdded}
                        ingredientsremoved={this.props.onIngredientRemoved}
                        disableInfos={disableInfos}
                        purchasable={this.updatePurchase()}
                        price={this.props.price}
                        ordered={this.purchaseHandler}
                    />
                </Aux>
            )
            orderSummary = <OrderSummary
                ingredients={this.props.ings}
                price={this.props.price}
                modalClosed={this.purchaseCancelHandler}
                purchaseContinue={this.purchaseContinueHandler} />
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

const mapStateToProps = state => {
    return {
        ings: state.burgerBuilder.ingredients,
        price: state.burgerBuilder.totalPrice, 
        error: state.burgerBuilder.error       
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onIngredientAdded : (ingName) => dispatch(actions.addIngredient(ingName)),
        onIngredientRemoved : (ingName) => dispatch(actions.removeIngredient(ingName)),
        onInitIngredients : () => dispatch(actions.initIngredients()),
        onInitPurchase : () => dispatch(actions.purchaseInit())
    };
};
export default connect(mapStateToProps,mapDispatchToProps)(WithErrorHandler(BurgerBuilder, axios));
// export default WithErrorHandler(BurgerBuilder, axios);