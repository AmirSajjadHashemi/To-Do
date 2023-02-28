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
let count = 1

/**
 * Functions
 */
function openAddNewInput () {
    addNewBTN.classList.add ('hide')
    addNewField.classList.remove ('hide')
}

function addToDoHandler () {
    let newTask = {
        id: count,
        title: addNewFieldInput.value,
        status: 'incomplete',
    }
    ToDoArray.push (newTask)
    localStorage.setItem ('to-do', JSON.stringify(ToDoArray))
    toDoGenerator (addNewFieldInput.value, ToDoArray[count-1].id, ToDoArray[count-1].status)
    count ++
}

function toDoGenerator (input_string, id, status) {
    addNewField.classList.add ('hide')
    addNewBTN.classList.remove ('hide')
    let listBody = $.createElement ('div')
    listBody.className = 'body'
    let liTask = `
    <li class="task" id="${id}" status="${status}">
        <span class="material-icons">drag_indicator</span>
        <h4>${input_string}</h4>
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
    taskList.append (listBody)
}

function removeThisTask (event) {
    event.target.parentElement.parentElement.parentElement.remove ()
}

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