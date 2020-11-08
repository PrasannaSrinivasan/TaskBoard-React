import React, { Component } from 'react';

import { FaRegTrashAlt} from "react-icons/fa";
import classes from "./Card.module.css";
import Button from "../../UI/Button/Button";

class Card extends Component {
    
    addComment = () => { }

    addCard = () => { }
    
    deleteCard = () => { }

    render(){
        const { provided, innerRef, cardName , cardDescription, comments, cardId  } = this.props;
        return (
            
                <div id={cardId} {...provided.draggableProps} {...provided.dragHandleProps} ref={innerRef}  className={classes.Card}>
                    <div className={classes.CardHeader}>  
                        <div> {cardName}</div>
                        <div><FaRegTrashAlt   style={{color: "#ff0037", cursor: "pointer"}}/></div>
                    </div>
                    <div> {cardDescription}</div>
                    <div>
                        <textarea className={classes.CardTextArea}/>
                    </div>
                    <Button click={this.addComment}  buttonColor="Green" > Add Comment</Button>
                    {
                        comments.map((item,index) => { 
                            return (<div key={index}> {item} </div>)
                        })
                    }
                </div>
        );
    }
}

export default Card;