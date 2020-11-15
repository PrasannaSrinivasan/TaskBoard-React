import React, { Component } from 'react';
import { DragDropContext } from 'react-beautiful-dnd';
import Lists from "../components/List/List";
import classes from "./TaskBoard.module.css";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Button from "../components/UI/Button/Button";

class TaskBoard extends Component {

    state = {
        listName: "",
        disableAddList: true
    };

    addNewList = () => {
        let listObject = {};
        listObject["listName"] = this.state.listName;
        listObject["listId"] = new Date().getTime().toString();
        listObject["cards"] = [];
        this.setState({ listName: "", disableAddList: true })
        this.props.addList(listObject);
    }

    handleListNameChange = (event) => {
        let listName = event.target.value;
        if (event.target.value && listName.trim()) {
            this.setState({ listName: listName, disableAddList: false })
        } else {
            this.setState({ listName: listName, disableAddList: true })
        }
    }

    dragEnded = event => { // Javascript Drop
        const droppedX = event.screenX;
        const droppedY = event.screenY;
        const listItems = document.querySelectorAll("#taskBoardContainer > div");
        const listId = event.target.id; let toPosition;
        listItems.forEach((list, index) => {
            let widthOffset = list.offsetLeft + list.offsetWidth;
            let heightOffset = list.offsetHeight + list.offsetTop;
            if(droppedX < list.offsetLeft && isNaN(toPosition)){
                toPosition = 0;
            }
            else if (droppedX < widthOffset && droppedY > list.offsetTop && droppedY < heightOffset && isNaN(toPosition)) {
                toPosition = index;
            }
        });
        if (isNaN(toPosition)) {
            toPosition = listItems.length - 1;
        }
        this.props.moveList(listId, toPosition);
        event.currentTarget.style.backgroundColor = "#337ab7";
    }

    dragEnter = event => {
        event.currentTarget.style.backgroundColor = "#00a1de";
        event.preventDefault();
    }

    dragOver = ev => {
        ev.preventDefault();
    }

    render() {

        return (
            <div className={classes.TaskBoard} >
                <div className={classes.Header}>
                    <div> Task Board </div>
                    <div>
                        <input type="text" style={{ width: "200px" }} placeholder="Enter List Name" className="Input" value={this.state.listName} onChange={this.handleListNameChange} />
                        <Button click={this.addNewList} disabled={this.state.disableAddList}>Add List</Button>
                        <Button buttonColor="Red" click={this.props.clearBoard}>Clear Board</Button>
                    </div>
                </div>
                <DragDropContext onDragEnd={(event) => this.props.moveCard(event)} >
                    <div id="taskBoardContainer" className={classes.ListContainer} onDragOver={e => this.dragOver(e)} onDragEnter={ev => this.dragEnter(ev)} onDragEnd={e => this.dragEnded(e)} >
                        <Lists />
                    </div>
                </DragDropContext>
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
        addList: (listDetails) => dispatch({ type: actions.ADD_LIST, list: listDetails }),
        clearBoard: () => dispatch({ type: actions.CLEAR_LIST }),
        moveCard: (event) => dispatch({ type: actions.MOVE_CARD, eventData: event }),
        moveList: (listId, toPosition) => dispatch({ type: actions.MOVE_LIST, listId: listId, toPosition: toPosition })
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);