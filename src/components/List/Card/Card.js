import React, { Component } from 'react';
import { FaRegTrashAlt } from "react-icons/fa";
import classes from "./Card.module.css";
import Button from "../../UI/Button/Button";
import { connect } from "react-redux";
import * as actions from "../../../store/actions";

class Card extends Component {


    addComment = (listId, cardId) => {
        let comment = document.getElementById(`text-${cardId}`);
        if(comment.value.trim()){
            this.props.addComment(listId, cardId, comment.value);
        }
        comment.value = "";
    }

    render() {
        
        const { provided, innerRef, cardItem, listId } = this.props;
        return (
            <div
                id={cardItem.cardId}
                className={classes.Card}
                ref={innerRef}
                {...provided.draggableProps}
                {...provided.dragHandleProps}
                >

                <div className={classes.CardHeader}>
                    <div> {cardItem.cardName} </div>
                    <div><FaRegTrashAlt onClick={() => this.props.deleteCard(cardItem.cardId, listId)} style={{ color: "#ff0037", cursor: "pointer" }} /></div>
                </div>
                <div> {cardItem.cardDescription}</div>
                <div>
                    <textarea className={classes.CardTextArea} id={`text-${cardItem.cardId}`} placeholder="Enter comments" />
                </div>
                <Button click={() => this.addComment(listId, cardItem.cardId)} buttonColor="Green" > Add Comment</Button>
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