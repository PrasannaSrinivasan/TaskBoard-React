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
        let listNumber = this.props.lists.length + 1;
        let listObject = {};
        listObject["listName"] = "List" + listNumber;
        listObject["listId"] = new Date().getTime().toString();
        listObject["cards"] = [];
        this.props.addList(listObject);
    }

    render() {

        console.log("Taskboard Rendered");

        return (
            <div className={classes.TaskBoard}>
                <div className={classes.Header}>
                    <div> Task Board </div>
                    <div>
                        <input type="text" placeholder="Enter List Name" className={classes.Input} />
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
        // onInitIngredients: () => dispatch(actions.initIngredients()),
        // onInitPurchase: () => dispatch(actions.purchaseInit())
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TaskBoard);
