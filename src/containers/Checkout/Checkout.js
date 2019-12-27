import React, { Component } from 'react';
import {Route} from 'react-router-dom';

import CheckouSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {
    state ={
        ingredients: null,
        totalprice: 0
    }
    componentWillMount() {
        const query = new URLSearchParams(this.props.location.search);
        const ingredients = {};
        let price = 0;
        for (let params of query.entries()) {
            if (params[0] === 'price') {
                price = params[1]
            } else {
                ingredients[params[0]] = +params[1]
            }
        }
        this.setState({ingredients : ingredients, totalprice: price});
    }

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        return (
            <div>
                <CheckouSummary
                 ingredients={this.state.ingredients}
                 checkoutCancel={this.checkoutCancelHandler}
                 checkoutContinue={this.checkoutContinueHandler}
                 />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    render={(props) =>  <ContactData ingredients={this.state.ingredients} {...props}/> } />
            </div>
        )
    }
}

export default Checkout;