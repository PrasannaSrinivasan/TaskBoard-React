import * as actionTypes from "./actions";

const initialState = {
    lists: [
        // {
        //     listName: "List 1",
        //     listId: "1",
        //     cards: [{
        //         cardId: "1",
        //         cardName: "Card 1",
        //         cardDesription: "Description",
        //         comments: [
        //             "Comment 1",
        //             "Comment 2",
        //         ]
        //     }, {
        //         cardId: "2",
        //         cardName: "Card 2",
        //         comments: [
        //             "Comment 1",
        //         ]
        //     }, {
        //         cardId: "3",
        //         cardName: "Card 3",
        //         comments: [
        //             "Comment 1",
        //             "Comment 2",
        //             "Comment 3",
        //         ]
        //     }]
        // }
    ]
};

const addList = (state, action) => {
    let updatedList = [...state.lists];
    updatedList.push(action.list);
    return {
        ...state,
        lists: updatedList
    };
}

const deleteList = (state, action) => {
    let updatedList = [...state.lists];
    updatedList = updatedList.filter(list => list.listId !== action.listId);
    return {
        ...state,
        lists: updatedList
    };

}

const clearList = (state, action) => {
    let updatedList = [];
    return {
        ...state,
        lists: updatedList
    };

}

const addCard = (state, action) => {
    const addToListId = action.listId;
    const cardItem = action.cardItem;
    let updatedList = [...state.lists];
    updatedList = updatedList.map(item => {
        if (item.listId === addToListId) {
            item.cards.push(cardItem);
        }
        return item;

    });
    return {
        ...state,
        lists: updatedList
    };

}

const deleteCard = (state, action) => {
    const deleteFromList = action.listId;
    const cardId = action.cardId;
    let updatedList = [...state.lists];
    updatedList = updatedList.map(listItem => {
        let updatedListItem = { ...listItem };
        if (updatedListItem.listId === deleteFromList) {
            updatedListItem.cards = updatedListItem.cards.filter(card => card.cardId !== cardId)
        }
        return updatedListItem;
    })
    return {
        ...state,
        lists: updatedList
    };

}

// const moveCard = (state, action) => {
//     let updatedList = [...state.lists];
//     return {
//         ...state,
//         lists: []
//     };

// }

const addComment = (state, action) => {
    const addToList = action.listId;
    const addToCardId = action.cardId;
    const comment = action.comment;
    let updatedList = [...state.lists];
    updatedList = updatedList.map(list => {
        if(list.listId === addToList){
            list.cards = list.cards.map(card => {
                if(card.cardId === addToCardId){
                    card.comments.push(comment);
                }
                return card;
            })
        }
        return list;
    })
    return {
        ...state,
        lists: updatedList
    };

}

// const deleteComment = (state, action) => {
//     const listId = action.listId;
//     const cardId = action.cardId;
//     const commentId = action.commentId;
//     let updatedList = [...state.lists];
//     return {
//         ...state,
//         lists: updatedList
//     };

// }

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.ADD_LIST: return addList(state, action);
        case actionTypes.DELETE_LIST: return deleteList(state, action);
        case actionTypes.CLEAR_LIST: return clearList(state, action);
        case actionTypes.ADD_CARD: return addCard(state, action);
        case actionTypes.DELETE_CARD: return deleteCard(state, action);
        // case actionTypes.MOVE_CARD: return moveCard(state, action);
        case actionTypes.ADD_COMMENT: return addComment(state, action);
        // case actionTypes.DELETE_COMMENT: return deleteComment(state, action);
        default: return state;
    }
};

export default reducer;

