import React, { Component } from 'react';
import {Draggable } from 'react-beautiful-dnd';
import classes from "./List.module.css";
import {FaRegTrashAlt} from "react-icons/fa";
import Button from "../UI/Button/Button"

import Card from "./Card/Card";

class List extends Component {

    editListName = () => { }

    markComplete = () => { }

    render(){
        const { provided, innerRef, cardsList, id , deleteList} = this.props;
        return (
            <div 
                id={id} 
                {...provided.draggableProps} 
                {...provided.dragHandleProps} 
                ref={innerRef} 
                className={classes.List} 
                >

                <div className={classes.ListHeader}> 
                    <div> {this.props.children}</div>
                    <div> 
                        <FaRegTrashAlt className={classes.ListIcons} onClick={deleteList} style={{color: "#ff0037", cursor: "pointer"}} /> 
                    </div>
                </div>
                <div>
                    {cardsList.length ? cardsList.map( (item,index) => {
                        return (<Draggable key={index} onStop={this.dragOnStop}  draggableId={item.cardId} index={index} >
                            {provided => {
                                const addCardBtn = <div style={{textAlign: 'center',margin: '10px 0 0 0 ', cursor: 'pointer'}} ><Button > Add Card </Button> </div>;
                                return (
                                <React.Fragment>
                                    <Card 
                                        provided={provided} 
                                        innerRef={provided.innerRef} 
                                        cardName ={item.cardName} 
                                        cardDescription = {item.cardDescription} 
                                        comments={item.comments}  
                                        key={index} 
                                        cardId = {item.cardId}
                                        />
                                    { cardsList.length - 1 === index || cardsList.length === 0 ?  addCardBtn : null}   
                                 </React.Fragment>
                            )}}
                        </Draggable>)
                    }) : <div style={{textAlign: 'center',margin: '10px 0 0 0 ', cursor: 'pointer'}} ><Button > Add Card </Button> </div>}
                </div>
            </div>
        );
    }
}

export default List;