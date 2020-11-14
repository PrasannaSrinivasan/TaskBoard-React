import React, { Component } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import List from "../components/List/List";
import Lists from "../components/List/ListRedux";
import classes from "./TaskBoard.module.css";
import { connect } from "react-redux";
import * as actions from "../store/actions";
import Button from "../components/UI/Button/Button";

class TaskBoard extends Component {

    state = {
        listName: "",
        disableAddList: false
    };

    addNewList = () => {
        let listObject = {};
        listObject["listName"] = this.state.listName;
        listObject["listId"] = new Date().getTime().toString();
        listObject["cards"] = [];
        this.setState({listName: "", disableAddList: true })
        this.props.addList(listObject);
    }

    handleListNameChange = (event) => {
        let listName = event.target.value;
        listName = listName.trim();
        if(event.target.value){
            this.setState({listName: listName,disableAddList: false })
        }else{
            this.setState({listName: listName,disableAddList: true })
        }
    }

    render() {

        console.log("Taskboard Rendered");

        return (
            <div className={classes.TaskBoard}>
                <div className={classes.Header}>
                    <div> Task Board </div>
                    <div>
                        <input type="text" placeholder="Enter List Name" className="Input" value={this.state.listName} onChange={this.handleListNameChange} />
                        <Button click={this.addNewList} disabled={this.state.disableAddList}>Add List</Button>
                        <Button buttonColor="Red" click={this.props.clearBoard}>Clear Board</Button>
                    </div>
                </div>
                <div id="taskBoardContainer" className={classes.ListContainer} >
                    <Lists />
                </div>
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
        clearBoard: () => dispatch({ type: actions.CLEAR_LIST })        
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
