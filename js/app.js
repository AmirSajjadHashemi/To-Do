/**
 * Variables
 */
let $ = document
let _query = function (query) {
    return $.querySelector (query)
}

let taskList = _query ('.tasks-list')
let addNewBTN = _query ('#add-new')
let addNewField = _query ('#add-new-field')
let addNewFieldInput = _query ('#add-new-field input')
let ToDoArray = []

/**
 * Functions
 */
function openAddNewInput () {
    addNewBTN.classList.add ('hide')
    addNewField.classList.remove ('hide')
}

function addToLocalStorage (input_Array) {
    localStorage.setItem ('to-do', JSON.stringify(input_Array))
}

function getFromLocalStorage () {
    return JSON.parse(localStorage.getItem ('to-do'))
}

function addToDoHandler () {

    let newTask = {
        id: ToDoArray.length + 1,
        title: addNewFieldInput.value,
        status: 'incomplete',
    }
    ToDoArray.push (newTask)
    
    addToLocalStorage (ToDoArray)
    // taskList.innerHTML = ''
    toDoGenerator (ToDoArray)
    
}

function toDoGenerator (input_Array) {
    addNewField.classList.add ('hide')
    addNewBTN.classList.remove ('hide')
    let listBody = $.createElement ('div')
    listBody.className = 'body'
    input_Array.forEach ( function (taskItem) {
        let liTask = `
        <li class="task" data-id="${taskItem.id}" status="${taskItem.status}">
            <span class="material-icons">drag_indicator</span>
            <h4>${taskItem.title}</h4>
            <div class="editable">
                <span class="edit">
                    <span class="material-icons">edit</span>
                </span>
                <span class="delete" onclick="removeThisTask (event)">
                    <span class="material-icons">delete_forever</span>
                </span>
            </div>
        </li>
        `
        listBody.insertAdjacentHTML ('afterbegin', liTask)

    })
    taskList.innerHTML = ''
    taskList.append (listBody)
}

function removeThisTask (event) {
    let liElemForRemove = event.target.parentElement.parentElement.parentElement
    // console.log(liElemForRemove)
    // liElemForRemove.remove ()

    let itemForRemoveIndex = ToDoArray.findIndex (function (item) {
        return item.id == liElemForRemove.dataset.id    // Why == works but === not works?!
    })
    console.log(itemForRemoveIndex)
    ToDoArray.splice (itemForRemoveIndex, 1)
    addToLocalStorage (ToDoArray)
    toDoGenerator (ToDoArray)
}

/**
 * Window onload
 */
window.addEventListener('load', function () {
    toDoGenerator (getFromLocalStorage ())
})

/**
 * Add events
 */
addNewBTN.addEventListener ('click', openAddNewInput)
addNewFieldInput.addEventListener ('keydown', function (event) {
    if (event.key === 'Enter') {
        addToDoHandler (addNewFieldInput.value)
        addNewFieldInput.value = ''
    }
    if (event.key === 'Escape') {
        addNewField.classList.add ('hide')
        addNewBTN.classList.remove ('hide')
        addNewFieldInput.value = ''
    }
})