let addForm = document.getElementById("addForm")
let taskId = JSON.parse(localStorage.getItem("taskId")) || 0;
const taskStorage = JSON.parse(localStorage.getItem("tasks")) || []
showTask()

/* FUNCIONES PRINCIPAL */
let getFormDates = async function() {
    let isLoggedIn = localStorage.getItem('isLoggedIn');
    if(isLoggedIn == 'true'){
        let data = await conJSON()
        let user = data[0].name
        let ttl = document.getElementById("taskTtl").value
        let date = document.getElementById("taskDate").value
        let tim = document.getElementById("taskTime").value
        let descrp = document.getElementById("taskDesc").value
        if(!descrp) {
            descrp = "No contiene descripción"
        }
        addTask(user, ttl, date, tim, descrp)
        addForm.reset()
        showTask()
        document.getElementById("tasks").scrollIntoView({ behavior: "smooth" });
    } else {
        Swal.fire({
            title: "Ups...",
            text: "Debes iniciar sesion para poder continuar",
            icon: "error"
        })
    }
}

function taskInfo(event) {
    if (event.target.classList.contains("delBtn")) {
        delTask(event.target.id);
    } else if (event.target.classList.contains("compBtn")) {
        compTask(event.target.id);
    }
}

function showTask() {
    let tasksCont = document.getElementById("taskCont")
    tasksCont.innerHTML = ''
    taskStorage.forEach (task => {
        const card = document.createElement("div")
        card.className = "taskCard"
        card.innerHTML  =  `<h4>${task.name}</h4>
                            <ul class="taskInfo">
                                <li><span class="taskLabel">Fecha:</span> ${task.date}</li>
                                <li><span class="taskLabel">Hora:</span> ${task.time}</li>
                                <li><span class="taskLabel">Descripción:</span> ${task.descrp}</li>
                                <li><span class="taskLabel">Creado por:</span> ${task.creator}</li>
                                <li><span class="taskLabel">Estado:</span> ${task.completed ? 'Completa' : 'No completa'}</li>
                            </ul>
                            <div class="taskBtns">
                                <button class="delBtn" id="${task.id}">Eliminar</button>
                                ${task.completed ? '' : `<button class="compBtn" id="${task.id}">Marcar como completada</button>`}
                            </div>`
        tasksCont.appendChild(card)
    })
    tasksCont.addEventListener("click", taskInfo);
}

addForm.addEventListener("submit", (event) => {
    event.preventDefault()
    getFormDates()
})


/* FUNCIONES ESPECIFICAS */
function addTask(user, ttl, date, tim, desc) {
    let task = {
        id: taskId++,
        name: ttl,
        descrp: desc,
        date: date,
        time: tim,
        creator: user,
        completed: false
    };
    taskStorage.push(task);
    localStorage.setItem("taskId", JSON.stringify(taskId))
    localStorage.setItem("tasks", JSON.stringify(taskStorage))
    showTask()
}

function delTask(taskId) {
    let taskIndex = taskStorage.findIndex(task => task.id == taskId)
    taskStorage.splice(taskIndex, 1);
    localStorage.setItem("tasks", JSON.stringify(taskStorage));
    showTask()
}

function compTask(taskId) {
    let task = taskStorage.find(task => task.id == taskId)
    task.completed = true
    localStorage.setItem("tasks", JSON.stringify(taskStorage));
    showTask()
}
