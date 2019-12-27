import React from 'react';
import Buger from '../../Burger/Buger';
import Button from '../../UI/Button/Button';
import classes from './CheckoutSummary.css';

const checkoutSummay = (props) => {
     return (
         <div className={classes.CheckoutSummay}>
                <h1>Hope que c'est bon ?!</h1>
                <div style={{width: '100%', margin:'auto'}}>
                    <Buger ingredients={props.ingredients}/>
                </div>
                <Button btnType='Danger' 
                clicked={props.checkoutCancel}>CANCEL</Button>
                <Button btnType='Success' 
                clicked={props.checkoutContinue}>CONTINUE</Button>
         </div>
     )
 }
 export default checkoutSummay;     