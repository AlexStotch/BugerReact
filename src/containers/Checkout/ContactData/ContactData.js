import React, { Component } from "react";
import Button from '../../../components/UI/Button/Button';
import classes from './ContactData.css';
import axios from '../../../axios-orders';
import Spinner from '../../../components/UI/Spinner/Spinner';

class ContactData extends Component {
    state= {
        name : '',
        email : '',
        address: {
            stree: '',
            postalCode: ''
        },
        loading: false,
    }
    orderHandler = (event) => {
        event.preventDefault();
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.price,
            customer: {
                name: 'Alex Pikou',
                address: {
                    street: 'wesh alors street',
                    zipCode: '75012',
                    country: 'France'
                },
                email: 'test@test.fr'
            },
            deliveryMethode: 'Fast'
        };
        axios.post('/orders.json', order)
            .then(res => {
                this.setState({ loading: false})
                this.props.history.push('/');
            })
            .catch(err => {
                this.setState({ loading: false })
                this.props.history.push('/');
            });
    }

    render () {
        let form = <form>
            <input className={classes.Input} type='text' name='name' placeholder='your name' />
            <input className={classes.Input} type='email' name='email' placeholder='your email' />
            <input className={classes.Input} type='text' name='street' placeholder='your street' />
            <input className={classes.Input} type='text' name='postalCode' placeholder='your postal code' />
        </form>;
        if (this.state.loading) {
            form = <Spinner />
        }

        return (
            <div className={classes.ContactData}>
                <h4>Enter your contact data bitch</h4>
                {form}
                <Button btnType='Success' clicked={this.orderHandler}>CONTINUE</Button>
            </div>
        )
    }
}

export default ContactData;
