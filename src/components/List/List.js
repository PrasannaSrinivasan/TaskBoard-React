import React, { Component } from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import classes from "./List.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../UI/Button/Button"
import Card from "./Card/Card";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class List extends Component {
    
    addCard = (event, listId) => {
        let cardItem = {};
        const cardNameInput = event.target.parentElement.children[0];
        const cardDescInput = event.target.parentElement.children[1];
        cardItem["cardName"] = cardNameInput.value.trim();
        cardItem["cardId"] = new Date().getTime().toString();
        cardItem["cardDescription"] = cardDescInput.value.trim();
        cardItem["comments"] = [];
        cardNameInput.value = "";
        cardDescInput.value = "";
        this.props.addCard(cardItem, listId);
    }

    handleCardInputChange = (event) => { // Vanilla JavaScript
        let cardName = event.target.parentElement.children[0].value;
        let cardDesc = event.target.parentElement.children[1].value;
        const addCardButton = event.target.parentElement.children[2];
        if (cardName.trim() && cardDesc.trim()) {
            addCardButton.disabled = false;
        } else {
            addCardButton.disabled = true;
        }
    }
    
    componentDidUpdate(){ // JavaScript DOM Access
        const addCardBtn = document.querySelectorAll(".addCard");
        addCardBtn.forEach(item => {
            if(!(item.parentElement.children[0].value.trim() && item.parentElement.children[1].value.trim()))
                item.setAttribute("disabled", true)
        });
    }

    render() {

        return (
            <React.Fragment>
                {this.props.lists.map((listItem, listIndex) => {
                    const addCardBtn = <div className={classes.AddCard} >
                        <input type="text" className={`${classes.InputPadding} Input `} onChange={this.handleCardInputChange} placeholder="Enter Card Name" />
                        <input type="text" className={`${classes.InputPadding} Input `} onChange={this.handleCardInputChange} placeholder="Enter Card Description" />
                        <Button addClass="addCard" ref={this.btnRef} click={(e) => this.addCard(e, listItem.listId)} > Add Card </Button>
                    </div>;
                    return (
                        <Droppable key={listItem.listId} droppableId={listItem.listId} >
                            {provided => {
                                return (<div
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                    className={classes.List}
                                    id={listItem.listId} >
                                    <div className={classes.ListHeader}>
                                        <div> {listItem.listName}</div>
                                        <div>
                                            <FaRegTrashAlt
                                                onClick={() => this.props.deleteList(listItem.listId)}
                                                className={classes.ListIcons}
                                                style={{ color: "#ff0037", cursor: "pointer" }} />
                                        </div>
                                    </div>
                                    <div>
                                        {listItem.cards.length ? listItem.cards.map((cardItem, cardIndex) => {
                                            return (
                                                <React.Fragment key={Number(cardItem.cardId)}>
                                                    { cardIndex === 0 ? addCardBtn : null}
                                                    <Draggable
                                                        index={cardIndex}
                                                        draggableId={cardItem.cardId} >
                                                        {provided => {
                                                            return (<Card cardItem={cardItem} listId={listItem.listId} key={Number(cardItem.cardId)} innerRef={provided.innerRef} provided={provided} />)
                                                        }}
                                                    </Draggable>
                                                </React.Fragment>)
                                        }) : addCardBtn}
                                    </div>
                                    {provided.placeholder}
                                </div>
                                )
                            }}
                        </Droppable>
                    )
                })}
            </React.Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        lists: state.lists
    };
}

const mapDispatchToProps = dispatch => {
    return {
        addCard: (cardItem, listId) => dispatch({ type: actions.ADD_CARD, cardItem: cardItem, listId: listId }),
        deleteList: (listId) => dispatch({ type: actions.DELETE_LIST, listId: listId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);