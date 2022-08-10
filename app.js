let userInput = document.getElementById('user-input')
let addBtn = document.getElementById('add-btn')
let todoContainer = document.getElementById('todo-container')
let container = document.getElementById('container') 

let todoArray = []
let todoFromLocalStorage = JSON.parse(localStorage.getItem("todoList"));
console.log(todoFromLocalStorage)

if (todoFromLocalStorage) {
    todoArray = todoFromLocalStorage;
    render(todoArray)
}

addBtn.addEventListener("click", () => {
    if (userInput.value === '') {
        return
    }
    todoArray.push(userInput.value)
    render(todoArray)
    userInput.value = ""
    localStorage.setItem('todoList', JSON.stringify(todoArray))
})

container.addEventListener('click', (e) => {
    const target = e.target
    if (target.classList.contains('checkbox')) {
        target.parentElement.firstElementChild.classList.add('line-through')
        target.firstElementChild.classList.add("check-img-show")
        target.classList.add('gold')
    }
    if (target.classList.contains('delete-todo')) {
        target.parentElement.remove()
        todoArray.splice(todoArray.indexOf(target.previousElementSibling.previousElementSibling.textContent), 1)
        localStorage.setItem('todoList', JSON.stringify(todoArray))
    }
    if (target.matches("img")) {
        target.parentElement.parentElement.remove()
        todoArray.splice(todoArray.indexOf(target.parentElement.previousElementSibling.previousElementSibling.textContent), 1)
        localStorage.setItem('todoList', JSON.stringify(todoArray))
    }
})

function render(array) {
    let listItem = '';
    for (let i = 0; i < array.length; i++) {
        listItem += 
            `
                <li>
                    <p>${todoArray[i]}</p>
                    <div class="checkbox">
                        <img src="img/checked.svg" class="check-img">
                    </div>
                    <div class="delete-todo">
                        <img src="img/delete-todo.svg">
                    </div>
                </li>
            `
    }
    todoContainer.innerHTML = listItem;
}

