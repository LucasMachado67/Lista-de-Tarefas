const listaTarefa = document.getElementById("lista-tarefa");

//function para quebrar as lihas do texto
function breakText(text, maxLength) {
  let result = "";
  for (let i = 0; i < text.length; i += maxLength) {
    result += text.slice(i, i + maxLength) + "<br>";
  }
  return result;
}
function addTask() {
  const input = document.getElementById("tarefa-input");
  // validando se tem algum dado dentro do input
  if (input.value == "") {
    return;
  }
  const taskLine = document.createElement("li");
  //const task = document.createTextNode(input.value);
  const task = document.createElement("span");
  task.innerHTML = breakText(input.value, 25);

  taskLine.appendChild(task);
  listaTarefa.appendChild(taskLine);

  //adicionando botão de editar tarefa
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "<i class='fa-solid fa-pencil'></i>";
  buttonEdit.id = "buttonEdit";
  taskLine.appendChild(buttonEdit);
  //adicionando botão de marcar como importante
  const buttonImportant = document.createElement("button");
  buttonImportant.innerHTML = "<i class='fa-solid fa-star'></i>";
  buttonImportant.id = "buttonImportant";
  taskLine.appendChild(buttonImportant);
  //adicionando botão de deletar a tarefa;
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
  buttonDelete.id = "buttonDelete";
  taskLine.appendChild(buttonDelete);

  //Function Deletar uma tarefa
  buttonDelete.addEventListener("click", function () {
    taskLine.remove();
    updateLocalStorage();
  });

  //chamando a função addImportant
  buttonImportant.addEventListener('click',function(){
    addImportant(taskLine);
    updateLocalStorage();
  })

  //function para editar a tarefa
  buttonEdit.addEventListener("click", function () {
    input.value = task.innerText;
    taskLine.remove();
    input.focus(); // diretamente abre o campo input para digitar;
  });

  // limpando o campo de input após a inserção de dados
  input.value = "";

  updateLocalStorage();
}
function addButtonEdit(){
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "<i class='fa-solid fa-pencil'></i>";
  buttonEdit.id = "buttonEdit";
  taskLine.appendChild(buttonEdit);
}

function addImportant(taskLine) {
  taskLine.classList.toggle("important");
  if (taskLine.classList.contains("important")) {
    listaTarefa.removeChild(taskLine);
    listaTarefa.insertBefore(taskLine, listaTarefa.firstChild);
  }
  taskLine.style.backgroundColor = "rgb(0, 183, 255)";
  taskLine.style.border = "3px solid rgb(5, 104, 143)";
  taskLine.style.color = "white";
}

function updateLocalStorage() {
  // Cria uma array para salvar as tarefas
  let tasks = [];
  // Loop atravez de cada tarefa
  const taskItems = listaTarefa.querySelectorAll("li");
  taskItems.forEach(function (taskItem) {
    let taskText = taskItem.querySelector("span").innerText;
    let isImportant = taskItem.classList.contains("important");
    tasks.push({ text: taskText, important: isImportant });
  });
  // salva as tarefas em array no localStorage como um JSON string
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function carrega as tarefas quando recarrega a página
window.onload = function () {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(function (task) {
    const taskLine = document.createElement("li");
    const taskText = document.createElement("span");
    taskText.innerHTML = breakText(task.text, 25);
    taskLine.appendChild(taskText);
    listaTarefa.appendChild(taskLine);
    if (task.important) {
      addImportant(taskLine);
    }
    
    //adicionando botão de editar tarefa
  const buttonEdit = document.createElement("button");
  buttonEdit.innerHTML = "<i class='fa-solid fa-pencil'></i>";
  buttonEdit.id = "buttonEdit";
  taskLine.appendChild(buttonEdit);
  //adicionando botão de marcar como importante
  const buttonImportant = document.createElement("button");
  buttonImportant.innerHTML = "<i class='fa-solid fa-star'></i>";
  buttonImportant.id = "buttonImportant";
  taskLine.appendChild(buttonImportant);
  //adicionando botão de deletar a tarefa;
  const buttonDelete = document.createElement("button");
  buttonDelete.innerHTML = "<i class='fa-solid fa-trash'></i>";
  buttonDelete.id = "buttonDelete";
  taskLine.appendChild(buttonDelete);

  //Function Deletar uma tarefa
  buttonDelete.addEventListener("click", function () {
    taskLine.remove();
    updateLocalStorage();
  });

  //chamando a função addImportant
  buttonImportant.addEventListener('click',function(){
    addImportant(taskLine);
    updateLocalStorage();
  })

  //function para editar a tarefa
  buttonEdit.addEventListener("click", function () {
    input.value = task.innerText;
    taskLine.remove();
    input.focus(); // diretamente abre o campo input para digitar;
  });
  });
  
};