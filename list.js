let listContainer = document.getElementById('list-container');
let inputBox = document.getElementById('input-box');
let todosJson = JSON.parse(localStorage.getItem("todos")) || [];
let filter = 'all';

function showTodos() {
    listContainer.innerHTML = '';
    todosJson.forEach((todo, index) => {
        if (filter === 'all' || filter === todo.status) {
            let li = document.createElement('li');
            li.className = todo.status === 'completed' ? 'checked' : '';
            li.innerHTML = `
                ${todo.name}
                <span onclick="removeTask(${index})">\u00D7</span>
            `;
            li.onclick = () => updateStatus(index);
            listContainer.appendChild(li);
        }
    });
}

function addTask() {
    if (inputBox.value.trim() !== '') {
        todosJson.push({ name: inputBox.value, status: 'pending' });
        inputBox.value = '';
        saveData();
        showTodos();
    } else {
        alert('Please Enter the Text');
    }
}

function updateStatus(index) {
    todosJson[index].status = todosJson[index].status === 'completed' ? 'pending' : 'completed';
    saveData();
    showTodos();
}

function removeTask(index) {
    todosJson.splice(index, 1);
    saveData();
    showTodos();
}

function deleteAllTasks() {
    todosJson = [];
    saveData();
    showTodos();
}

function filterTasks(status) {
    filter = status;
    showTodos();
}

function saveData() {
    localStorage.setItem("todos", JSON.stringify(todosJson));
}

showTodos();
