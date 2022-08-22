const userInput = document.getElementById('user-input');
const addBtn = document.getElementById('add-btn');
const todoContainer = document.getElementById('todo-container');
const container = document.getElementById('container');
// localStorage.clear()
let todoArray = [];
let textClassArray = [];

let elementIndexArray = [];

let todoArrayFromLocalStorage = JSON.parse(localStorage.getItem("todoArray"))
let textClassArrayFromLocalStorage = JSON.parse(localStorage.getItem("textClassArray"))

let elementIndexArrayFromLocalStorage = JSON.parse(localStorage.getItem("elementIndexArray"))

let checks;
let checkedTexts;

if (todoArrayFromLocalStorage) {
    todoArray = todoArrayFromLocalStorage;
    createTodo(todoArray)
}

if (textClassArrayFromLocalStorage) {
    textClassArray = textClassArrayFromLocalStorage;
    createTodo(todoArray)
}


if (elementIndexArrayFromLocalStorage) {
    elementIndexArray = elementIndexArrayFromLocalStorage;
    createTodo(todoArray)
    
}


function createTodo(array) {
    listItem = '';
    for (let i = 0; i < array.length; i++) {
        listItem += 
                    `
                        <li>
                            <p class="${textClassArray[i]}">${todoArray[i]}</p>
                            <button class="checked-img-container">
                                 
                            </button> 
                            <button class="delete-img-container">   
                                <img src="img/delete-todo.svg" class="delete-img">
                            </buttton>
                        </li>
                    `;
    }
    todoContainer.innerHTML = listItem
    userInput.value = ""

    checks = document.querySelectorAll(".gold");
    checks.forEach(check => {
        check.innerHTML = `
                        <img src="img/checked.svg" class="checked-img">
                            `;
    })

    checkedTexts = document.querySelectorAll(".line-through") 
    checkedTexts.forEach(checkedText => {
            checkedText.nextElementSibling.innerHTML = `
            <img src="img/checked.svg" class="checked-img">
                `;
            checkedText.nextElementSibling.style.backgroundColor = 'gold'
    })
    
}


function userInputFunction() {
    if (userInput.value.trim() === '') {
        return
    }
    todoArray.push(userInput.value)
    textClassArray.push(userInput.value)
    elementIndexArray.push(userInput.value)
}


function checkedTodo(target) {
    //  DECLARATIONS
    const prevSib = target.previousElementSibling;

    
    // =======================================
    // =======================================


    //  MAIN CODE
    target.innerHTML = `
                <img src="img/checked.svg" class="checked-img">
                        `;

    prevSib.style.textDecoration = 'line-through'
    target.style.backgroundColor = 'gold'

    //  LOCAL STORAGE MUST SAVE --- "CODES"
    textClassArray[textClassArray.indexOf(prevSib.textContent)] = "line-through"

    //  CONSOLE.LOGs
    console.log(todoArray, textClassArray, elementIndexArray)
}

function deleteTodo(target) {
    //  DECLARATIONS
    const prnt = target.parentElement;
    const doublePrevSib = target.previousElementSibling.previousElementSibling;


    // =======================================
    // =======================================


    //  MAIN CODE
    prnt.remove()
    todoArray.splice(todoArray.indexOf(doublePrevSib.textContent), 1)
    textClassArray.splice(elementIndexArray.indexOf(doublePrevSib.textContent), 1)
    elementIndexArray.splice(elementIndexArray.indexOf(doublePrevSib.textContent), 1)
}

function deleteImgTodo(target) {
    //  DECLARATIONS
    const doublePrnt = target.parentElement.parentElement
    const prntDoublePrevSib = target.parentElement.previousElementSibling.previousElementSibling;


    // =======================================
    // =======================================


    //  MAIN CODE
    doublePrnt.remove()
    todoArray.splice(todoArray.indexOf(prntDoublePrevSib.textContent), 1)
    textClassArray.splice(elementIndexArray.indexOf(prntDoublePrevSib.textContent), 1)
    elementIndexArray.splice(elementIndexArray.indexOf(prntDoublePrevSib.textContent), 1)

}


addBtn.addEventListener("click", () => {
    userInputFunction()
    createTodo(todoArray)

    console.log(todoArray)
    localStorage.setItem("todoArray", JSON.stringify(todoArray))
    localStorage.setItem("textClassArray", JSON.stringify(textClassArray))
    localStorage.setItem("elementIndexArray", JSON.stringify(elementIndexArray))

})

todoContainer.addEventListener("click", (e) => {
    const listTarget = e.target
    
    if (listTarget.classList.contains("checked-img-container")) {
        checkedTodo(listTarget)
    }

    if (listTarget.classList.contains("delete-img-container")) {
        deleteTodo(listTarget)
    }

    if (listTarget.classList.contains("delete-img")) {
        deleteImgTodo(listTarget)
    }



    //  LOCAL STORAGES
    localStorage.setItem("todoArray", JSON.stringify(todoArray))
    localStorage.setItem("textClassArray", JSON.stringify(textClassArray))
    localStorage.setItem("elementIndexArray", JSON.stringify(elementIndexArray))

})