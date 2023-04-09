const userSection = document.querySelector('div#user-section');
const userForm = userSection.querySelector('form#user-form');
const userInput = userSection.querySelector('input');
const greeting = userSection.querySelector('h2#greeting');

const greetingText = document.createElement('span');
const onBtn = document.createElement('div');
const onIcon = document.createElement('i');
const offBtn = document.createElement('div');
const offIcon = document.createElement('i');


const USERNAME = 'user_name'
const HIDDEN_CLASSNAME = 'hidden';

let username = "";

function makeOnBtn() {
    onBtn.id = 'on-btn';
    onIcon.className = 'fa-solid fa-right-to-bracket fa-xl';

    userForm.appendChild(onBtn);
    onBtn.appendChild(onIcon);
}


function saveUserName() {
    localStorage.setItem(USERNAME, username);
}

function handleUserOn() {
    greetingText.innerText = `Welcome, ${username}`;
    offBtn.id = 'off-btn';
    offIcon.className = 'fa-solid fa-right-from-bracket';

    offBtn.appendChild(offIcon);
    greeting.append(greetingText, offBtn);
    greeting.classList.remove(HIDDEN_CLASSNAME);
    offBtn.addEventListener('click', handleUserOff);
}

function handleUserOff() {
    localStorage.removeItem(USERNAME);
    greeting.classList.add(HIDDEN_CLASSNAME);
    userForm.classList.remove(HIDDEN_CLASSNAME);
}

function handleSubmit(event) {
    event.preventDefault();
    const name = userInput.value;
    userInput.value = "";
    if (name !== "") {
        userForm.classList.add(HIDDEN_CLASSNAME);
        username = name;
        saveUserName();
        handleUserOn();
    }
    else {
        alert('이름을 입력해 주시기 바랍니다.');
    }
}

makeOnBtn();
onBtn.addEventListener('click', handleSubmit);
userForm.addEventListener('submit', handleSubmit);

const savedUserName = localStorage.getItem(USERNAME);

if (savedUserName !== null) {
    userForm.classList.add(HIDDEN_CLASSNAME);
    username = localStorage.getItem(USERNAME);
    handleUserOn();
}