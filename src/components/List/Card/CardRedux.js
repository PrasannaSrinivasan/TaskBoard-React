import React, { Component } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import classes from "./Card.module.css";
import Button from "../../UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class Card extends Component {


    addComment = (listId, cardId) => {
        let comment = document.getElementById(`text-${cardId}`);
        this.props.addComment(listId, cardId, comment.value);
        comment.value = "";
    }

    render() {
        console.log("Card Rendered");
        const { provided, innerRef, cardItem, listId, key } = this.props;
        return (

            <div id={cardItem.cardId} className={classes.Card} key={key}>
                <div className={classes.CardHeader}>
                    <div> {cardItem.cardName} </div>
                    <div><FaRegTrashAlt onClick={() => this.props.deleteCard(cardItem.cardId, listId)} style={{ color: "#ff0037", cursor: "pointer" }} /></div>
                </div>
                <div> {cardItem.cardDescription}</div>
                <div>
                    <textarea className={classes.CardTextArea} id={`text-${cardItem.cardId}`}></textarea>
                </div>
                <Button click={() => this.addComment(listId,cardItem.cardId)} buttonColor="Green" > Add Comment</Button>
                {
                    cardItem.comments.map((item, index) => {
                        return (<div key={index}> {item} </div>)
                    })
                }
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        lists: state.lists
    };
}

const mapDispatchToProps = dispatch => {
    return {
        deleteCard: (cardId, listId) => dispatch({ type: actions.DELETE_CARD, listId: listId, cardId: cardId }),
        addComment: (listId, cardId, comment) => dispatch({ type: actions.ADD_COMMENT, listId: listId, cardId: cardId, comment: comment })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);