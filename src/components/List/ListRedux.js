import React, { Component } from 'react';
import classes from "./List.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../UI/Button/Button"
import Card from "./Card/CardRedux";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class List extends Component {

    addCard = (event, listId) => {
        let cardItem = {};
        cardItem["cardName"] = event.target.parentElement.children[0].value.trim();
        cardItem["cardId"] = new Date().getTime().toString();
        cardItem["cardDescription"] = event.target.parentElement.children[1].value.trim();
        cardItem["comments"] = [];
        this.props.addCard(cardItem, listId);
    }

    handleCardInputChange = (event) => { // Vanilla JavaScript
        let cardName = event.target.parentElement.children[0].value;
        let cardDesc = event.target.parentElement.children[1].value;
        const addCardButton = event.target.parentElement.children[2];
        console.log(addCardButton);
        if (cardName.trim() && cardDesc.trim()) {
            addCardButton.disabled = false;
        } else {
            addCardButton.disabled = true;
        }
    }

    render() {
        console.log("List Rendered");
        return (
            <React.Fragment>
                {this.props.lists.map((listItem, listIndex) => {
                    const addCardBtn = <div className={classes.AddCard} >
                        <input type="text" className={`${classes.InputPadding} Input `} onChange={this.handleCardInputChange} placeholder="Enter Card Name" />
                        <input type="text" className={`${classes.InputPadding} Input `} onChange={this.handleCardInputChange} placeholder="Enter Card Description" />
                        <Button click={(e) => this.addCard(e, listItem.listId)} > Add Card </Button>
                    </div>;
                    return (
                        <div key={listIndex} className={classes.List} id={listItem.listId} >
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
                                        <React.Fragment key={cardIndex}>
                                            { cardIndex === 0 ? addCardBtn : null}
                                            <Card cardItem={cardItem} listId={listItem.listId} />
                                            {/* { listItem.cards.length - 1 === cardIndex || listItem.cards.length === 0 ? addCardBtn : null} */}
                                        </React.Fragment>)
                                }) : addCardBtn}
                            </div>
                        </div>
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