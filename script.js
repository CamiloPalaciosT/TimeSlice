const tasks = [];
let time = 0;
let timer = null;
let timerBreak = null;
let current = null;
renderTime();
renderTasks();

const bAdd = document.querySelector('#bAdd');
const itTask = document.querySelector('#itTask');
const form = document.querySelector('#form');
const taskName = document.querySelector('#time #taskName');
const audio = new Audio('sound/alarma.mp3');
const audio2 = new Audio('sound/alarma2.mp3');
const stopButton = document.querySelector('#stop');
const minPomodoro = document.querySelector('#minPomodoro');
const inputPomodoro = parseInt(minPomodoro.value);
const minBreak = document.querySelector('#minBreak');
const inputBreak = parseInt(minBreak.value);

form.addEventListener('submit', e => {
    e.preventDefault();
    if(itTask.value !== ''){
        createTask(itTask.value);
        itTask.Value = '';
        renderTasks();
        itTask.value = null;
    }
});

function createTask(value){
    const newTask = {
        id: (Math.random() * 100).toString(36).slice(3),
        title: value,
        completed: false
    };

    tasks.unshift(newTask);
}

function renderTasks() {
    const html = tasks.map(task =>{
        return `
        <div class="task">
            <div class="completed">${
                task.completed 
                ? `<span class = "done"> &#9745; Tarea Realizada</span>` :`<button class="start-button" data-id= "${task.id}">Empezar Tarea</button>` 
        }   </div>
            <div class="title">${task.title}</div>
        </div>`    
});
    const taskContainer = document.querySelector('#task');
    taskContainer.innerHTML = html.join("");

    const startButtons = document.querySelectorAll('.task .start-button');

    startButtons.forEach(button => {
        button.addEventListener('click', e => {
                if(!timer){
                    const id = button.getAttribute('data-id');  
                    startButtonHandler(id);
                    button.textContent = 'En proceso ...'
                }
        });
    });
}

function startButtonHandler(id){
    const inputPomodoro = parseInt(minPomodoro.value);
    time = inputPomodoro * 60;
    current = id;
    const taskIndex = tasks.findIndex(task => task.id === id);
    taskName.textContent = tasks[taskIndex].title;
   
    timer = setInterval(() =>{
        timeHandler(id);
    }, 1000);
}

function startButtonStop(){                                       }

function timeHandler(id) {
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timer);
        markCompleted(id);
        timer = null;
        renderTasks();
        audio.play();
        startbreak();
    }
}
function startbreak(){
    const inputBreak = parseInt(minBreak.value);
    time = inputBreak * 60;
    taskName.textContent = 'break';
    timerBreak = setInterval(() => {
        timerBreakHandler();
    }, 1000);
}

function timerBreakHandler(){
    time--;
    renderTime();

    if(time === 0){
        clearInterval(timerBreak);
        current = null;
        timerBreak = null;
        audio2.play();
        taskName.textContent = '';
        renderTasks();
    }

}

function renderTime(){
    const timeDiv = document.querySelector('#time #value');
    const minutos = parseInt(time / 60);
    const seconds = parseInt(time % 60);

    timeDiv.textContent = `${minutos < 10 ? "0":""}${minutos}:${seconds < 10 ? "0":""}${seconds}`;
}
function markCompleted(id ){
    const taskIndex = tasks.findIndex((task) => task.id === id);
    tasks[taskIndex].completed = true;
}

stopButton.addEventListener('click', function() {
    clearInterval(timer);
    clearInterval(timerBreak);
    current = null;
    timer = null;
    timerBreak = null;
    taskName.textContent = '';
    renderTasks();
    location.reload(); // recargar la página para reiniciar el script
  }
  );
