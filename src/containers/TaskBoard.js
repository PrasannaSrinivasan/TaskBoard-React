import React, { Component } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
//import { BsFillTrashFill, BsPlusSquareFill } from "react-icons/bs";
import List from "../components/List/List";
import classes from "./TaskBoard.module.css";

import Button from "../components/UI/Button/Button";

class TaskBoard extends Component {

    clearBoard = () => {
        // Deleting All Contents from the Board
    }

    addList = () => {
        // Add new list to Board
        let listNumber = this.state.lists.length + 1;
        let listObject = {};
        listObject["listName"] = "List"+ listNumber;
        listObject["id"] = new Date().getTime().toString();
        const updatedlist = [...this.state.lists];
        updatedlist.push(listObject);
        this.setState({ ...this.state, lists : updatedlist});
    }

    deleteList = () => {
        // Delete list from Board
    }
    state = {
        lists : [ ]
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
                        {/* <BsFillTrashFill style={{color: "#ff0037", cursor: "pointer"}} /> */}
                   </div>    
                </div>
                <DragDropContext>
                    <Droppable droppableId="list">
                        {provided => (
                            <div id="taskBoardContainer" className={classes.ListContainer} ref={provided.innerRef}  {...provided.droppableProps} >
                                {this.state.lists.map((item, index) => (
                                    <Draggable key={index}  draggableId={item.id} index={Number(item.id)} >
                                        {provided => (
                                            <List provided={provided} innerRef={provided.innerRef} >
                                                {item.listName}
                                            </List>
                                        )}
                                    </Draggable>
                                ))}
                            {provided.placeholder}
                            </div>
                        )}
                        </Droppable>
                </DragDropContext>

            </div>
        );
    }
}
export default TaskBoard;