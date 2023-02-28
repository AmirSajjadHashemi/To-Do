/**
 * Variables
 */
let $ = document
let _query = function (query) {
    return $.querySelector (query)
}

let taskList = _query ('.task-list')
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

function addToDoHandler () {
    addNewField.classList.add ('hide')
    addNewBTN.classList.remove ('hide')
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
})