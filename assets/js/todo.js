const todoSection = document.querySelector('div#todo-section');
const todoForm = todoSection.querySelector('form#todo-form');
const todoInput = todoSection.querySelector('input');
const todoList = todoSection.querySelector('ul#todo-list');

let todos = [];
const TODOS = 'todos';

function deleteTodos() {
    localStorage.removeItem(TODOS);
}

function saveTodos() {
    localStorage.setItem(TODOS, JSON.stringify(todos));
}

/**
 * 입력된 Todo <li> 태그 중 버튼을 누른 태그 제거 & 로컬 스토리지에서도 해당 object 제거 하는 함수.
 * @param {clickEvent} event - 특정 HTMLElement를 click했을 때 발생하는 event
 */
function removeTodo(event) {
    let removes = event.target.parentElement;
    switch (typeof removes.className !== typeof '') {
        case true:
            removes = removes.parentElement.parentElement;
            break;
        case false:
            switch (removes.className) {
                case 'todos':
                    break;
                case 'delete-btn':
                    removes = removes.parentElement;
                    break;
            }
            break;
    }
    removes.remove();
    const removeID = removes.id;
    todos = todos.filter(object => object.id !== parseInt(removeID));

    if (todos.length === 0) {
        deleteTodos();
    } else {
        saveTodos();
    }
}

/**
 * 새로운 Todo가 입력되었을 때, 화면에 그려주는 함수.
 * @param {Object} newTodo - 새로운 Todo에 대한 object = {id, content}.
 */
function drawTodo(newTodo) {
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');
    const deleteBtn = document.createElement('div');
    const deleteIcon = document.createElement('i');

    newLi.id = newTodo.id;
    newLi.className = 'todos';
    newSpan.innerText = newTodo.content;
    deleteIcon.className = "fa-solid fa-trash delete-icon";
    deleteBtn.className = 'delete-btn';

    deleteBtn.appendChild(deleteIcon);
    todoList.append(newLi);
    newLi.append(newSpan, deleteBtn);
    deleteBtn.addEventListener('click', removeTodo);
}

/**
 * Todo 입력값이 submit되었을 때 화면에 그리기 위해 데이터를 넘겨주는 함수.
 * @param {submitEvent} event - 입력한 값을 submit했을 때 발생하는 event
 */

function handleTodoSubmit(event) {
    event.preventDefault();
    const newTodo = todoInput.value;
    todoInput.value = "";
    const newObject = {
        id: Date.now(),
        content: newTodo,
    }
    todos.push(newObject);
    drawTodo(newObject);
    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedData = localStorage.getItem(TODOS);

if (savedData !== null) {
    const savedTodos = JSON.parse(savedData);
    todos = savedTodos;
    savedTodos.forEach(item => {
        drawTodo(item);
    });
}