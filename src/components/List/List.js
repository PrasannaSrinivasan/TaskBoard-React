import React, { Component } from 'react';
import {Droppable, Draggable } from 'react-beautiful-dnd';
import classes from "./List.module.css";
import Card from "./Card/Card";
class List extends Component {

editListName = () => {
    
}

addCard = () => {

}

deleteCard = () => {

}

markComplete = () => {

}

    render(){
        const { provided, innerRef } = this.props;
        return (
            <div {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef} className={classes.List} >
                {this.props.children}
            </div>
        );
    }
}

export default List;