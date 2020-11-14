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

    // shouldComponentUpdate(nextProps, nextState) {

    //     return nextProps.lists.length !== this.props.lists.length;
    // }

    render() {

        return (
            <div className={classes.TaskBoard}>
                <div className={classes.Header}>
                    <div> Task Board </div>
                    <div>
                        <input type="text" style={{width: "200px"}} placeholder="Enter List Name" className="Input" value={this.state.listName} onChange={this.handleListNameChange} />
                        <Button click={this.addNewList} disabled={this.state.disableAddList}>Add List</Button>
                        <Button buttonColor="Red" click={this.props.clearBoard}>Clear Board</Button>
                    </div>
                </div>
                <DragDropContext onDragEnd={(event) => this.props.moveCard(event)} >
                    <div id="taskBoardContainer" className={classes.ListContainer} >
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
        moveCard: (event) => dispatch({ type: actions.MOVE_CARD , eventData: event})
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);