document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskInput = document.getElementById("task-input");
  const taskList = document.getElementById("task-list");

  let tasks = [];

  // Load tasks from LocalStorage
  function loadTasks() {
    const savedTasks = localStorage.getItem("tasks");
    tasks = savedTasks ? JSON.parse(savedTasks) : [];
    renderTasks();
  }

  // Save tasks to LocalStorage
  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }

  // Add task
  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if (taskText) {
      const task = {
        id: Date.now(),
        text: taskText,
        completed: false,
      };
      tasks.push(task);
      saveTasks(); // Save tasks after adding
      renderTasks();
      taskInput.value = "";
    }
  });

  // Handle task actions
  taskList.addEventListener("click", (e) => {
    const taskId = e.target.closest("li").dataset.id;

    if (e.target.classList.contains("delete-btn")) {
      tasks = tasks.filter((task) => task.id != taskId);
      saveTasks(); // Save tasks after deletion
      renderTasks();
    }

    if (e.target.classList.contains("complete-btn")) {
      const task = tasks.find((task) => task.id == taskId);
      task.completed = !task.completed;
      saveTasks(); // Save tasks after toggling completion
      renderTasks();
    }

    if (e.target.classList.contains("edit-btn")) {
      const task = tasks.find((task) => task.id == taskId);
      const newTaskText = prompt("Edit Task:", task.text);
      if (newTaskText !== null) {
        task.text = newTaskText.trim() || task.text;
        saveTasks(); // Save tasks after editing
        renderTasks();
      }
    }
  });

  // Render tasks
  function renderTasks() {
    taskList.innerHTML = tasks
      .map(
        (task) => `
      <li data-id="${task.id}" class="${task.completed ? "completed" : ""}">
        ${task.text}
        <div class="task-buttons">
          <button class="complete-btn">${task.completed ? "Undo" : "Complete"}</button>
          <button class="edit-btn">Edit</button>
          <button class="delete-btn">Delete</button>
        </div>
      </li>
    `
      )
      .join("");
  }

  // Initialize the app
  loadTasks();
});
