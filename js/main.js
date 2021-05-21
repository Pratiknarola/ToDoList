import ToDoList from "./todolist.js";
import ToDoItem from "./todoitem.js";

const toDolist = new ToDoList();

//launch app

document.addEventListener("readystatechange", (event) => {
    if(event.target.readyState === "complete") {
        initApp();
    }
});

const initApp = () => {

    const itemEntryForm = document.getElementById("newItemForm");
    itemEntryForm.addEventListener("submit", (event) => {
        event.preventDefault();
        processSubmission();
    })

    const clearItems = document.getElementById("clearItems");
    clearItems.addEventListener("click", (event) => {
        const list = toDolist.getlist();
        if(list.length) {
            const confirmed = confirm("Are you sure you want to clear the entire list? ");
            if (confirmed) {
                toDolist.clearlist();
                // Update persistant data
                updatePersistantData(toDolist.getlist());
                refreshThepage();
            }
        }
    });

    loadListObject();


    refreshThepage();
}


const loadListObject = () => {
    const storedlist = localStorage.getItem("myTodolist");
    if (typeof storedlist !== "string") return;
    const parselist = JSON.parse(storedlist);
    parselist.forEach(itemobj => {
        const newTodoitem = createNewItem(itemobj._id, itemobj._item);
        toDolist.addItemtoList(newTodoitem);
    })
}

const refreshThepage = () => {
    clearListDisplay();
    renderList();
    clearItemEntryField();
    setFocusOnItemEntry();

}

const updatePersistantData = (list) => {
    localStorage.setItem("myTodolist", JSON.stringify(list));

}

const clearListDisplay = () => {
    const parentelement = document.getElementById("listItems");
    deleteContents(parentelement);
}

const deleteContents = (parentelement) => {
    let child = parentelement.lastElementChild;
    while (child){
        parentelement.removeChild(child);
        child = parentelement.lastElementChild;
    }
}

const renderList = () => {
    const list = toDolist.getlist()
    list.forEach((item) => {
        buildListItem(item);
    });
}

const buildListItem = (item) => {
    const div = document.createElement("div");
    div.className = "item";
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = item.getId();
    check.tabIndex = 0;
    addClickListenerToCheckbox(check);
    const label = document.createElement("label");
    label.htmlFor = item.getId();
    label.textContent = item.getItem();
    div.appendChild(check);
    div.appendChild(label);
    const container = document.getElementById("listItems");
    container.appendChild(div);

}


const addClickListenerToCheckbox = (checkbox) => {
    checkbox.addEventListener("click", (event)=> {
        toDolist.removeItemfromList(checkbox.id);
        // Remove from persistant data
        updatePersistantData(toDolist.getlist());
        setTimeout(() => {
            refreshThepage();
        }, 2000);

    });

};

const clearItemEntryField = () => {
    document.getElementById("newItem").value = "";
};

const setFocusOnItemEntry = () => {
    document.getElementById("newItem").focus();
};


const processSubmission = () => {
    const newEntryText = getNewEntry();
    if (!newEntryText.length) return; 

    const nextItemId = calcNextItemId(); 
    const todoitem = createNewItem(nextItemId, newEntryText);
    toDolist.addItemtoList(todoitem);
    // Add to persistant data 
    updatePersistantData(toDolist.getlist());
    refreshThepage();

};

const getNewEntry = () => {
    return document.getElementById("newItem").value.trim();
}


const calcNextItemId = () => {
    let nextItemId = 1;
    const list = toDolist.getlist();
    if ( list.length > 0 ) {
        nextItemId = list[list.length -1 ].getId() + 1;
    }
    return nextItemId;
}


const createNewItem = (nextItemId, newEntryText) => {
    const todo = new ToDoItem();
    todo.setId(nextItemId);
    todo.setItem(newEntryText);
    return todo;
}










