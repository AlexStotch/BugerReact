import React, { Component } from 'react';
import Aux from '../../../hoc/Aux/Aux';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {
    render () {
        const ingredientsSummary =  Object.keys(this.props.ingredients)
        .map( key => {
            return (
            <li key={key}>
                <span style={{textTransform: "capitalize"}}>{key}: {this.props.ingredients[key]}</span>
            </li>
            )
        });
    
        return (
            <Aux>
                <h3>Your Order</h3>
                <p>Delicious Burger</p>
                <ul>
                    {ingredientsSummary}
                </ul>
                <p><strong>Total Price : {this.props.price.toFixed(2)}</strong></p>
                <p>Continue to checkout ?</p>
                <Button btnType="Danger" clicked={this.props.modalClosed}>CANCEL</Button>
                <Button btnType="Success" clicked={this.props.purchaseContinue}>CONTINUE</Button>
            </Aux>
        )
    }
}

export default OrderSummary;