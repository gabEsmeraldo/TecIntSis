const apiURL = "https://jsonplaceholder.typicode.com/todos";
const taskList = document.getElementById("taskList");
const taskInput = document.getElementById("taskInput");

async function fetchTasks() {
  try {
    const response = await fetch(`${apiURL}?_limit=5`);
    const json = await response.json();
    json.forEach((task) => renderTask(task.title, task.id, task.element));
  } catch (error) {
    alert("ERRRRRROUUUU", error.message);
  }
}

async function handleAddTask() {
  const novaTarefa = taskInput.value.trim();
  if (!novaTarefa) return alert("Digite uma tarefa no campo");

  try {
    const response = await fetch(`${apiURL}`, {
      method: "POST",
      body: JSON.stringify({ title: novaTarefa, completed: false, userId: 1 }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });

    const newTask = await response.json();
    renderTask(newTask.title);
    taskInput.value = "";
  } catch (error) {
    alert("Erro ao adicionar uma nova tarefa");
  }
}

async function deleteTask(id, element) {
  try {
    await fetch(`${apiURL}/${id}`, { method: "DELETE" });
    element.remove();
  } catch (error) {
    alert("Erro! Não foi possível realizar a deleção");
  }
}

async function toggleTaskStatus(id, element) {
  const isCompleted = element.classList.contains("completed");

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PATCH",
      body: JSON.stringify({ completed: isCompleted }),
      headers: { 'Content-type' : 'application/json; charset=UTF-8' },
    });

    if (response.ok) {
      element.classList.toggle('completed');
    }
  } catch (error) {
    alert("Erro ao completar a tarefa: ", error);
  }
}

async function editTask(id, element) {
  const span = element.querySelector("span");
  const novoTexto = prompt("Edite sua tarefa:", span.innerText);

  if (!novoTexto || novoTexto === span.innerText) return;

  try {
    const response = await fetch(`${apiURL}/${id}`, {
      method: "PUT",
      body: JSON.stringify({
        id: id,
        title: novoTexto,
        completed: element.classList.contains("completed"),
        userId: 1,
      }),
      headers: { "Content-type": "application/json; charset=UTF-8" },
    });
    if (response.ok) {
      const dadosAtualizados = await response.json();
      span.innerText = dadosAtualizados.title;
    }
  } catch (error) {
    alert("Erro ao atualizar a tarefa: ", error);
  }
}

function renderTask(title, id, completed = false) {
  const li = document.createElement("li");
  li.innerHTML = `
        <span onclick="toggleTaskStatus(${id}, this.parentElement)", style="cursor: pointer">${title}</span>
        <div class="actions">
            <button class="btn-edit" onclick="editTask(${id}, this.parentElement.parentElement)">Editar</button>
            <button class="btn-delete" onclick="deleteTask(${id}, this.parentElement.parentElement)">Deletar</button>
        </div>
        `;

  taskList.appendChild(li);
}

fetchTasks();
