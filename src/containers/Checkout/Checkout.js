import React, { Component } from 'react';
import {Route, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';

import CheckouSummary from '../../components/Order/CheckoutSummary/CheckoutSummary'; 
import ContactData from '../Checkout/ContactData/ContactData';

class Checkout extends Component {

    checkoutCancelHandler = () => {
        this.props.history.goBack();
    }
    
    checkoutContinueHandler = () => {
        this.props.history.replace('/checkout/contact-data');
    }
    render() {
        let summary = <Redirect to="/"/>
        if (Object.keys(this.props.ings).length) {
            summary = ( 
            <div>
                <CheckouSummary
                 ingredients={this.props.ings}
                 checkoutCancel={this.checkoutCancelHandler}
                 checkoutContinue={this.checkoutContinueHandler}
                 />
                <Route
                    path={this.props.match.path + '/contact-data'}
                    component={ContactData} />
            </div>
            ) 
        }
        return summary
    }
}

const mapStateToProps = state => {
    return {
        ings: state.ingredients,
    }
};

export default connect(mapStateToProps)(Checkout);