import React from 'react';
import classes from './BuildControls.css'
import BuildControl from '../BuildControls/BuildControl/BuildControl';

const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Bacon', type: 'bacon' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' },
]; 

const buildControls = (props) => (
    <div className={classes.BuildControls}>
        <p>Current Price : <strong>{props.price.toFixed(2)}</strong></p>

        {controls.map(ctr => <BuildControl
            key={ctr.label}
            label={ctr.label}
            added={ () => props.ingredientsAdded(ctr.type)}
            removed={ () => props.ingredientsremoved(ctr.type)}
            disable={props.disableInfos[ctr.type]}
        />)}
        <button className={classes.OrderButton}
            disabled={!props.purchasable}
            onClick={props.ordered}
        >{ props.isAuth ? 'ORDER NOW' : 'SIGNUP TO ORDER'}</button>
    </div>
)

export default buildControls;