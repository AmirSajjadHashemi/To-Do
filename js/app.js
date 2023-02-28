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

/**
 * Functions
 */
function openAddNewInput () {
    addNewBTN.classList.add ('hide')
    addNewField.classList.remove ('hide')
}

function addToDoHandler (input_string) {
    addNewField.classList.add ('hide')
    addNewBTN.classList.remove ('hide')
    let listBody = $.createElement ('div')
    listBody.className = 'bod y'
    let liTask = `
    <li class="task">
        <span class="material-icons">drag_indicator</span>
        <h4>${addNewFieldInput.value}</h4>
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

    let deleteTask = _query ('.delete')
    deleteTask.addEventListener ('click', function () {
        console.log ('hi')
    })
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