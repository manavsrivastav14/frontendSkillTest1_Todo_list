// Defining variables 
let tasks = [];
let completedTasks = [];
let uncompletedTasks = [];
let countUncompletedTasks = 0;
const tasksList = document.getElementById('list');
const addTaskInput = document.getElementById('add');
const tasksCounter = document.getElementById('tasks-counter');

// Adding the task to frontend
function addTaskToDOM(task){
    const li  = document.createElement('li');
    li.innerHTML = `
        
            <input type="checkbox" id="${task.id}" ${task.taskCompleted ? 'checked':''} class="custom-checkbox" >
            <label for="${task.id}">${task.taskInput}</label>
            <img src="https://cdn-icons-png.flaticon.com/512/1617/1617543.png" class="delete" data-id="${task.id}" />
    `;
    tasksList.append(li);
}

// Rendering the todo tasks at frontend
function renderList (tasks) {
    countUncompletedTasks = 0;
    tasksList.innerHTML = '';
    for(let i = 0; i< tasks.length ; i++){
        addTaskToDOM(tasks[i])
        if(tasks[i].taskCompleted===false){
            countUncompletedTasks += 1;
        }
    }
    tasksCounter.innerHTML = countUncompletedTasks;
}
// Rendering the uncompleted tasks at frontend
function renderUncompletedTaskList(){
    uncompletedTasks = tasks.filter((task) =>{
        if(task.taskCompleted === false){
            return task;
        }
    });
    console.log(uncompletedTasks);
    renderList(uncompletedTasks);
}
// Rendering the completed tasks at frontend
function renderCompletedTaskList(){
    completedTasks = tasks.filter((task) =>{
        if(task.taskCompleted === true){
            return task;
        }
    });
    console.log(completedTasks);
    renderList(completedTasks);
}
// Making task status as complete
function markTaskAsComplete (taskId) {
    tasks.map((task) => {
        if(task.id === taskId){
            task.taskCompleted = !task.taskCompleted;
        }
        return task;
    })
    renderList(tasks);
}
// Making all tasks' status as comple
function markAllTaskAsComplete(){
    tasks.map((task) => {
        task.taskCompleted = true
        return task;
    })
    renderList(tasks)
}
// Deleting tasks
function deleteTask (taskId) {
    tasks = tasks.filter((task) => {
        // console.log(task);
        if(task.id !== taskId){
            return task;
        }
    });
    renderList(tasks);
}
// Deleting all completed tasks from the todo list
function clearCompletedTasks(){
    tasks = tasks.filter((task) => {
        if(task.taskCompleted !== true){
            return task;
        }
    });
    renderList(tasks);
}
// Adding task to the list
function addTask (task) {
    if(task){
        tasks.push(task);
        renderList(tasks);
        return;
    }
}

// Taking User Input
function takeUserInput(event){
    if(event.key ==='Enter'){
        const userInput = event.target.value;
        // console.log(userInput);
        if(userInput!==''){
            const task = {
                taskInput:userInput,
                id: Date.now().toString(),
                taskCompleted: false
            }
            event.target.value ='';
            addTask(task);
        }
    }
}
// Listening to click event of user to decide which function to execute
function handleClickListener(event){
    const target = event.target;
    // console.log(target);
    if (target.className === 'delete'){
        // All values stored in data fields in html are present inside dataset
        const taskId = target.dataset.id;
        deleteTask(taskId);

    }
    else if (target.className === 'custom-checkbox'){
        const taskId = target.id;
        markTaskAsComplete(taskId);
    }
    else if(target.id === 'complete-all-tasks'){
        markAllTaskAsComplete();
    }
    else if(target.id === 'clear-completed'){
        clearCompletedTasks();
    }
    else if(target.id === 'all'){
        renderList(tasks);
    }
    else if(target.id === 'uncomplete-tasks'){
        renderUncompletedTaskList();
        // renderList();
    }
    else if(target.id === 'completed-tasks'){
        renderCompletedTaskList();
    }

}

// Listening when to add and render task 
addTaskInput.addEventListener('keyup',takeUserInput);

// Adding eventListener to the document 
document.addEventListener('click', handleClickListener);
