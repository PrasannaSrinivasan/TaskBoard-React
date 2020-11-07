import React, { Component } from 'react';
import {  Draggable } from 'react-beautiful-dnd';
import classes from "./Card.module.css";
class Card extends Component {

    addComment = () => {

    }

    render(){

        return (
            // <Draggable>
                <div className={classes.Card}>

                </div>
           // </Draggable>
        );
    }
}

export default Card;