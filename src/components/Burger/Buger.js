import React from 'react';
import classes from './Burger.css';
import BurgerIngredients from './BurgerIngredients/BurgerIngredients';

const burger = (props) => {
    let id = 0; 
    let transforIngredients = Object.keys(props.ingredients)
    .map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_) => {
            id = id + 1;
            return <BurgerIngredients key={id} type={igKey} />
        })
    })
    .reduce((arr, el) => {
        return arr.concat(el);
    },[]);

    if (transforIngredients.length === 0) {
        transforIngredients = <p>Please start adding ingredients !</p>
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredients type="bread-top" />
            {transforIngredients}
            <BurgerIngredients type="bread-bottom" />
        </div>
    );
};

export default burger;