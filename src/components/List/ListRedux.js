import React, { Component } from 'react';
import classes from "./List.module.css";
import { FaRegTrashAlt } from "react-icons/fa";
import Button from "../UI/Button/Button"
import Card from "./Card/CardRedux";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

class List extends Component {
    
    addCard = (listId) => {
        let cardItem = {};
        cardItem["cardName"] = "Card Name 1";
        cardItem["cardId"] = new Date().getTime().toString();
        cardItem["cardDescription"] = "Card Description";
        cardItem["comments"] = [];
        this.props.addCard(cardItem,listId);
     }
    
    render() {
        console.log("List Rendered");
        return (
            <React.Fragment>
                {this.props.lists.map((listItem, listIndex) => {
                    const addCardBtn = <div style={{textAlign: 'center',margin: '10px 0 0 0 ', cursor: 'pointer'}} >
                            <Button click={() => this.addCard(listItem.listId)} > Add Card </Button> 
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
                                            <Card  cardItem={cardItem} listId={listItem.listId} />
                                            { listItem.cards.length - 1 === cardIndex || listItem.cards.length === 0 ? addCardBtn : null}
                                        </React.Fragment>)
                                }) : addCardBtn }
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
        addCard: (cardItem,listId) => dispatch({ type: actions.ADD_CARD, cardItem: cardItem, listId: listId }),
		deleteList: (listId) => dispatch({ type: actions.DELETE_LIST, listId: listId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(List);