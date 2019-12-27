import React from 'react';
import classes from './Order.css';

const order = (props) => {
    const ingredients = [];
    for (let name in props.ingredients) {
        ingredients.push({
            name: name,
            amount:Number.parseFloat(props.ingredients[name]) 
        })
    }

    const ingredientsOutput = ingredients.map(ig => {
        return <span 
        style={{
            textTransform: 'capitalize',
            display: 'inline-block',
            margin: '0 8px',
            border: '1px solid #CCC',
            padding:'5px'
        }}
        key={ig.name}>{ig.name} ({ig.amount})</span>
    })
    return (
        <div className={classes.Order}>
            <p>Ingredients: {ingredientsOutput} </p>
            <p>Price <strong>{props.price}</strong></p>
        </div>
    )
};

export default order;