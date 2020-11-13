import React, { Component } from 'react';
import { FaRegTrashAlt} from "react-icons/fa";
import classes from "./Card.module.css";
import Button from "../../UI/Button/Button";
import {connect} from "react-redux";
import * as actions from "../../../store/actions";

class Card extends Component {
    
    addComment = () => { }
    
    deleteCard = () => { }

    render(){
        console.log("Card Rendered");
        const { provided, innerRef, cardItem , listId, key } = this.props;
        return (
            
                <div id={cardItem.cardId} className={classes.Card} key={key}>
                    <div className={classes.CardHeader}>  
                        <div> {cardItem.cardName} </div>
                        <div><FaRegTrashAlt onClick={() => this.props.deleteCard(cardItem.cardId,listId)}  style={{color: "#ff0037", cursor: "pointer"}}/></div>
                    </div>
                    <div> {cardItem.cardDesription}</div>
                    <div>
                        <textarea className={classes.CardTextArea}></textarea>
                    </div>
                    <Button click={this.addComment}  buttonColor="Green" > Add Comment</Button>
                    {
                        cardItem.comments.map((item,index) => { 
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
        deleteCard: ( cardId,listId) => dispatch({ type: actions.DELETE_CARD, listId: listId, cardId: cardId })
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Card);