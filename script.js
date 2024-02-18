// Arrays to store different categories of todo items
var todoList = []; // All todo items
var completedItems = []; // Completed todo items
var remainingItems = []; // Remaining todo items

// DOM elements
var addButton = document.getElementById("add-button");
var todoInput = document.getElementById("todo-input");
var deleteAllButton = document.getElementById("delete-all");
var allTodos = document.getElementById("all-todos");
var deleteSButton = document.getElementById("delete-selected");

// Event listeners
addButton.addEventListener("click", add);
deleteAllButton.addEventListener("click", deleteAll);
deleteSButton.addEventListener("click", deleteS);

// Click event listener for various actions
document.addEventListener('click', (e) => {
    // Complete todo item
    if (e.target.className.split(' ')[0] == 'complete' || e.target.className.split(' ')[0] == 'ci') {
        completeTodo(e);
    }
    // Delete todo item
    if (e.target.className.split(' ')[0] == 'delete' || e.target.className.split(' ')[0] == 'di') {
        deleteTodo(e);
    }

    // Filter todo items based on status
    if (e.target.id == "all") {
        viewAll();
    }
    if (e.target.id == "rem") {
        viewRemaining();
    }
    if (e.target.id == "com") {
        viewCompleted();
    }
});

// Key press event listener for adding todo item on 'Enter'
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        add();
    }
});

// Update the counts and filtered lists
function update() {
    completedItems = todoList.filter((element) => {
        return element.complete;
    });
    remainingItems = todoList.filter((element) => {
        return !element.complete;
    });
    document.getElementById("r-count").innerText = todoList.length.toString(); // Update total tasks count
    document.getElementById("c-count").innerText = completedItems.length.toString(); // Update completed tasks count
}

// Add a new todo item
function add() {
    var value = todoInput.value;
    if (value === '') {
        alert("Task cannot be empty");
        return;
    }
    todoList.push({
        task: value,
        id: Date.now().toString(),
        complete: false,
    });

    todoInput.value = "";

    update();
    addingMain(todoList);
}

// Render todo items in the main list
function addingMain(todoList) {
    allTodos.innerHTML = "";
    todoList.forEach(element => {
        var x = `<li id=${element.id} class="todo-item">
    <p id="task"> ${element.complete ? `<strike>${element.task}</strike>` : element.task} </p>
    <div class="todo-actions">
                <button class="complete btn btn-success">
                    <i class=" ci bx bx-check bx-sm"></i>
                </button>

                <button class="delete btn btn-error" >
                    <i class="di bx bx-trash bx-sm"></i>
                </button>
            </div>
        </li>`;
        allTodos.innerHTML += x;
    });
}

// Delete a todo item
function deleteTodo(e) {
    var deleted = e.target.parentElement.parentElement.getAttribute('id');
    todoList = todoList.filter((ele) => {
        return ele.id != deleted;
    });

    update();
    addingMain(todoList);
}

// Complete a todo item
function completeTodo(e) {
    var completed = e.target.parentElement.parentElement.getAttribute('id');
    todoList.forEach((obj) => {
        if (obj.id == completed) {
            if (obj.complete == false) {
                obj.complete = true;
                console.log(e.target.parentElement.parentElement);
                e.target.parentElement.parentElement.querySelector("#task").classList.add("line");
            } else {
                obj.complete = false;
                e.target.parentElement.parentElement.querySelector("#task").classList.remove("line");
            }
        }
    });

    update();
    addingMain(todoList);
}

// Delete all todo items
function deleteAll(todo) {
    todoList = [];
    update();
    addingMain(todoList);
}

// Delete selected (completed) todo items
function deleteS(todo) {
    todoList = todoList.filter((element) => {
        return !element.complete;
    });
    update();
    addingMain(todoList);
}

// View completed todo items
function viewCompleted() {
    addingMain(completedItems);
}

// View remaining todo items
function viewRemaining() {
    addingMain(remainingItems);
}

// View all todo items
function viewAll() {
    addingMain(todoList);
}
