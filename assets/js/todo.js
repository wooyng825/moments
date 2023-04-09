const todoSection = document.querySelector('div#todo-section');
const todoForm = todoSection.querySelector('form#todo-form');
const todoInput = todoSection.querySelector('input');
const todoList = todoSection.querySelector('ul#todo-list');

const newForm = document.createElement('form');
const newInput = document.createElement('input');
newForm.id = 'edit-form';
newForm.style.width = '64%';
newInput.id = 'edit-input';
newInput.type = 'text';
newInput.style.fontSize = '0.88rem';
newInput.style.padding = '2px 0';
newInput.style.margin = '0';
newInput.style.borderRadius = '5px';
newInput.style.width = '100%';
let editList;
let initValue = '';

const SELECTED = 'selected';
const STARED = 'stared';


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
 * @param {clickEvent} event - 휴지통 아이콘을 click했을 때 발생하는 event
 */
function removeTodo(event) {
    let removes = event.currentTarget.parentElement;
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
 * 입력된 Todo <li> 태그 중 버튼을 누른 태그 선명하게 & 상단으로 위치하는 함수.
 * @param {clickEvent} event - 별 아이콘을 click했을 때 발생하는 event
 */
function starTodo(event) {
    const star = event.currentTarget;
    const list = event.currentTarget.parentElement;
    const listID = list.id;

    if ((list.className).includes('selected')) {
        list.classList.remove(SELECTED);
        todos.forEach(object => {
            switch (object.id === parseInt(listID)) {
                case true:
                    object.class = 'list';
                    break;
                case false:
                    break;
            }
        });
        star.classList.remove(STARED);
    }
    else {
        list.classList.add(SELECTED);
        todos.forEach(object => {
            switch (object.id === parseInt(listID)) {
                case true:
                    object.class = 'list selected';
                    break;
                case false:
                    break;
            }
        });
        star.classList.add(STARED);
    }

    const selected = todos.filter(object => (object.class).includes('selected'));

    if (selected.length > 0) {
        const others = todos.filter(object => !(object.class).includes('selected'));
        todos = [...selected, ...others];

        selected.forEach(item => {
            const removes = document.getElementById(item.id);
            todoList.removeChild(removes);
            drawTodo(item);
        });
    }
    saveTodos();
}

/**
 * 입력된 Todo <li> 태그 중 버튼을 누른 태그 편집할 수 있도록 하는 함수.
 * @param {clickEvent} event - 편집 아이콘을 click했을 때 발생하는 event 
 */
function editTodo(event) {
    editList = event.currentTarget.parentElement;

    switch (editList.children[1].id !== 'edit-form') {
        case true:
            initValue = editList.children[1].innerText;
            editList.children[1].remove();
            newInput.value = initValue;

            newForm.appendChild(newInput);
            editList.children[0].after(newForm);
            break;
        case false:
            const newSpan = document.createElement('span');
            newSpan.innerText = initValue;
            newForm.remove();
            editList.children[0].after(newSpan);
            break;
    }
    newForm.addEventListener('submit', newTodo);
}


/**
 * input을 통해 새로 입력된 값으로 최신화하거나 원래의 값을 유지하는 함수.
 * @param {submitEvent} event - 입력한 값을 submit했을 때 발생하는 event 
 */
function newTodo(event) {
    event.preventDefault();
    const editValue = newInput.value;
    const newSpan = document.createElement('span');
    newInput.value = "";

    const editListID = editList.id;
    const edit = todos.filter(object => object.id === parseInt(editListID));
    const others = todos.filter(object => object.id !== parseInt(editListID));

    if (editValue === '') {
        newSpan.innerText = initValue;
    }
    else {
        newSpan.innerText = editValue;
        edit[0].content = editValue;
    }
    newForm.remove();
    todos = [...edit, ...others];
    saveTodos();
    editList.children[0].after(newSpan);
}

/**
 * 새로운 Todo가 입력되었을 때, 화면에 그려주는 함수.
 * @param {Object} newTodo - 새로운 Todo에 대한 object = {id, content}.
 */
function drawTodo(newTodo) {
    const newLi = document.createElement('li');
    const newSpan = document.createElement('span');

    const editBtn = document.createElement('span');
    const editIcon = document.createElement('i');
    const starBtn = document.createElement('span');
    const starIcon = document.createElement('i');
    const deleteBtn = document.createElement('span');
    const deleteIcon = document.createElement('i');

    newLi.id = newTodo.id;
    newLi.className = newTodo.class;
    newSpan.innerText = newTodo.content;
    editIcon.className = 'fa-solid fa-edit';
    editBtn.className = 'edit-btn';
    starIcon.className = 'fa-solid fa-star';
    starBtn.className = 'star-btn';
    deleteIcon.className = "fa-solid fa-trash";
    deleteBtn.className = 'delete-btn';

    editBtn.classList.add(HIDDEN_CLASSNAME);
    deleteBtn.classList.add(HIDDEN_CLASSNAME);

    if ((newLi.className).includes('selected')) {
        newLi.classList.add(SELECTED);
        starBtn.classList.add(STARED);
        todoList.prepend(newLi);
    }
    else {
        todoList.appendChild(newLi);
    }

    editBtn.appendChild(editIcon);
    starBtn.appendChild(starIcon);
    deleteBtn.appendChild(deleteIcon);

    newLi.append(starBtn, newSpan, editBtn, deleteBtn);
    newLi.addEventListener('mouseenter', function () {
        editBtn.classList.remove(HIDDEN_CLASSNAME);
        deleteBtn.classList.remove(HIDDEN_CLASSNAME);
    });
    newLi.addEventListener('mouseleave', function () {
        editBtn.classList.add(HIDDEN_CLASSNAME);
        deleteBtn.classList.add(HIDDEN_CLASSNAME);
    });
    starBtn.addEventListener('click', starTodo);
    editBtn.addEventListener('click', editTodo);
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
        class: 'list',
        content: newTodo,
    }
    todos.push(newObject);
    drawTodo(newObject);
    saveTodos();
}

todoForm.addEventListener('submit', handleTodoSubmit);

const savedData = localStorage.getItem(TODOS);

if (savedData !== null) {
    let savedTodos = JSON.parse(savedData);
    const selected = savedTodos.filter(object => (object.class).includes(SELECTED));
    const others = savedTodos.filter(object => !(object.class).includes(SELECTED));
    savedTodos = [...selected, ...others];

    todos = savedTodos;
    savedTodos.forEach(item => {
        drawTodo(item);
    });
}