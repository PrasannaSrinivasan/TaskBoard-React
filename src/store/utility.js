export const updateState = (oldObject, updatedProperties) => {
    
    const currentObj = { ...oldObject, ...updatedProperties };
    localStorage.setItem("taskListState", JSON.stringify(currentObj));
    
    return currentObj;
};