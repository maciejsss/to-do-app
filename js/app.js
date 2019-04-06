const ul = document.querySelector('ul');
const taskNumber = document.querySelector('h1 span');
const toDoList = [];

const formAdd = document.querySelector('.addForm');
const inputAdd = document.querySelector('.addInput');
const inputSearch = document.querySelector('.searchInput');
const ico = document.querySelector(".ico i");
const listItems = document.getElementsByClassName('task');

const removeAllBtn = document.querySelector(".removeAllBtn");

// SEARCH TASK FUNCTION

const removeTask = (e) => {
    e.target.parentNode.remove();
    const index = e.target.parentNode.dataset.key;
    toDoList.splice(index, 1)
    taskNumber.textContent = toDoList.length;
    renderList();
    if (toDoList.length === 0) {
        ul.innerHTML = "<div class='info'>All tasks done!</div>";
    }
}

// ADD TASK FUNCTION

const addTask = (e) => {
    e.preventDefault();
    const titleTask = inputAdd.value;
    const task = document.createElement('li');
    const taskDate = new Date().toLocaleString();
    if (titleTask === "") return;

    task.classList = "animated fadeIn task";
    task.innerHTML = `<span class="date-span">${taskDate}</span> ${titleTask} <button>X</button>`;
    toDoList.push(task);
    renderList();

    ul.appendChild(task);
    inputAdd.value = "";

    taskNumber.textContent = listItems.length;
    task.querySelector("button").addEventListener("click", removeTask)
}

// SEARCH TASK FUNCTION

const searchTask = (e) => {
    e.preventDefault();
    const searchTxt = e.target.value.toLowerCase();
    let tasks = toDoList;
    tasks = tasks.filter(li => li.textContent.toLowerCase().includes(searchTxt))
    ul.textContent = "";
    tasks.forEach(li => ul.appendChild(li));
    taskNumber.textContent = listItems.length;
    ico.classList.toggle("coloured");

}

// RENDER LIST FUNCTION

const renderList = () => {
    ul.textContent = "";
    toDoList.forEach((toDoElem, key) => {
        toDoElem.dataset.key = key;
        ul.appendChild(toDoElem)

    })
}

// REMOVE ALL TASKS FUNCTION

const removeAllTasks = () => {
    toDoList.length = 0;
    taskNumber.textContent = toDoList.length;
    renderList();
    if (toDoList.length === 0) {
        ul.innerHTML = "<div class='info'>All tasks done!</div>";
    }
}

// BTN, INPUT EVENTS

removeAllBtn.addEventListener("click", removeAllTasks);
formAdd.addEventListener("submit", addTask);
inputSearch.addEventListener("input", searchTask)