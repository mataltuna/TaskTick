let addForm = document.getElementById("addForm")
const tasks = []


/* FUNCION PRINCIPAL */
let getFormDates = function() {
    let user = document.getElementById("userName").value
    let ttl = document.getElementById("taskTtl").value
    let date = document.getElementById("taskDate").value
    let tim = document.getElementById("taskTime").value
    let descrp = document.getElementById("taskDesc").value
    if(!descrp) {
        descrp = "No contiene descripción"
    }
    addTask(user, ttl, date, tim, descrp)
}

addForm.addEventListener("submit", (event) => {
    event.preventDefault()
    getFormDates()
})


/* FUNCIONES ESPECIFICAS */
function addTask(user, ttl, date, tim, desc) {
    let task = {
        name: ttl,
        descrp: desc,
        date: date,
        time: tim,
        creator: user,
        completed: false
    };
    tasks.push(task);
    let container = document.createElement("div")
    debugger
    container.className = "taskCard task"
    debugger
    container.innerHTML =  `<h4>$[task.ttl]</h4>
                            <p>$[task.date]<br>$[task.time]<br>$[task.descrip]<br>Creado por $[task.creator]<br>No completa</p>`
    debugger
}


function delTask() {
    do {
        let delName = prompt("Ingrese el nombre de la tarea").toUpperCase();
        let delId = tasks.indexOf([delName]);
        tasks.pop(delId);
        console.log("Se eliminó la tarea correctamente");
    } while (confirm("¿Desea eliminar otra?"))
}


function compTask() {
    do {
        let compName = prompt("Ingrese el nombre de la tarea").toUpperCase()
        let compId = tasks.indexOf([compName])
        tasks[compId.completed] = true
        console.log("Se completada la tarea exitosamente")
    } while (confirm("¿Desea marcar como completada otra?"))
}


function revTask() {
    for(let i = 0 ; i < tasks.length; i++) {
        console.log(tasks[i].name)
    }
}
