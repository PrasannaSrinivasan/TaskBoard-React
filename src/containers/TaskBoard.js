import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from "../components/List/List";
import classes from "./TaskBoard.module.css";

import Button from "../components/UI/Button/Button";

class TaskBoard extends Component {

    state = {
        lists : [ {
            listName: "List 1", 
            id:  new Date().getTime().toString(), 
            cards: [
                {
                    cardName: "List 1 Card 1 ", 
                    cardDescription: "Card Description 1",
                    cardId: "1",
                    comments: [
                        "Comment 1",
                        "Comment 2"
                    ]
                },
                {
                    cardName: "List 1 Card 2", 
                    cardDescription: "Card Description 1",
                    cardId: "2",
                    comments: [
                        "Comment 1",
                        "Comment 2"
                    ]
                },
                {
                    cardName: "List 1 Card 3", 
                    cardDescription: "Card Description 1",
                    cardId: "3",
                    comments: [
                        "Comment 1",
                        "Comment 2"
                    ]
                }
            ]
        }]
    }
    clearBoard = () => {
        this.setState({ ...this.state, lists : []});
    }
    
    deleteCard = (deleteCardId) => {
        //alert("Delete Card");
        console.log(this.state);
        const lists = [...this.state.lists];
        lists.forEach((item,index) => { 
            item.cards.forEach( (cdItem, cdindex) => {
                if(cdItem.cardId === deleteCardId){
                    lists[index].cards.splice(cdindex,1);
                }
            });
            
        });
        this.setState({ ...this.state, lists : lists});
    }

    addList = () => {
        // Add new list to Board
        let listNumber = this.state.lists.length + 1;
        let listObject = {};
        listObject["listName"] = "List"+ listNumber;
        listObject["id"] = new Date().getTime().toString();
        listObject["cards"] = [{
            cardName: `List ${listNumber} Card 1`,
            cardId: new Date().getTime().toString(),
            cardDescription: "Card Description",
            comments: [
                "Comment 1",
                "Comment 2"
            ]
        }];
        const updatedlist = [...this.state.lists];
        updatedlist.push(listObject);
        this.setState({ ...this.state, lists : updatedlist});
    }

    dragOnEnd = result => {
        const { destination, source, draggableId } = result;
        let cardIndex;
        const lists = [...this.state.lists];
        let cardItem;
        if(!destination){
            return;
        }
        lists.forEach((item,index) => { 
            if(item.id === source.droppableId) {
                item.cards.forEach( (cdItem, cdindex) => {
                    if( cdItem.cardId === draggableId){
                        cardItem = cdItem;
                        cardIndex = cdindex;
                    }
                })
            } 
        });
        lists.forEach((item,index) => {
            if(item.id === source.droppableId){
                lists[index].cards.splice(cardIndex, 1);
            }
            if(item.id === destination.droppableId){
                lists[index].cards.push(cardItem);
            }
        });

        this.setState({...this.state, lists : lists});
    }

    deleteList = (listId) => {
        let lists = [...this.state.lists];
        const updatedList = lists.filter(item => item.id !== listId);
        this.setState({...this.state, lists: updatedList});
    }

    shouldComponentUpdate(nextProps, nextState){
       console.log(nextState.lists.length !== this.state.lists.length);
         return nextState.lists.length !== this.state.lists.length;
    }

    render(){
        console.log("Taskboard rendered");
        return (
            <div className={classes.TaskBoard}>
               <div className={classes.Header}>
                   <div> Task Board </div>
                   <div>
                        <Button buttonColor="Red" click={this.clearBoard}>Clear Board</Button>
                        <Button click={this.addList}>Add List</Button>
                   </div>    
                </div>
                
                <DragDropContext onDragEnd={this.dragOnEnd.bind(this)}>
                    <div id="taskBoardContainer" className={classes.ListContainer} >
                        {this.state.lists.map((item, index) => (
                            <Droppable key={index}  droppableId={item.id}>
                                {provided => {
                                        return (
                                            <React.Fragment>
                                                <List                                                    
                                                    provided={provided} 
                                                    innerRef={provided.innerRef} 
                                                    cardsList={item.cards} 
                                                    id={item.id} 
                                                    deleteList={() => this.deleteList(item.id)} 
                                                    >
                                                        {item.listName}
                                                    
                                                {/* {provided.placeholder} */}
                                                </List>
                                            </React.Fragment>
                                        // 
                                        );
                                    } 
                                }
                                    
                            </Droppable>
                        ))}
                    </div>
                </DragDropContext>
            </div>
        );
    }
}
export default TaskBoard;