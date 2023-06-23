class Task {
    constructor(description, dueDate, priority, notes) {
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
      this.completed = false;
    }
  
    markAsCompleted() {
      this.completed = true;
    }
  
    editTask(description, dueDate, priority, notes) {
      this.description = description;
      this.dueDate = dueDate;
      this.priority = priority;
      this.notes = notes;
    }
  
    deleteTask() {
      taskList.deleteTask(taskList.tasks.indexOf(this));
    }
  }
  
  class TaskList {
    constructor() {
      this.tasks = [];
    }
  
    addTask(task) {
      this.tasks.push(task);
    }
  
    sortTasks(sortBy) {
      switch (sortBy) {
        case "due_date":
          this.tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
          break;
        case "priority":
          this.tasks.sort((a, b) => {
            const priorityOrder = { high: 3, medium: 2, low: 1 };
            return priorityOrder[b.priority] - priorityOrder[a.priority];
          });
          break;
        case "description":
          this.tasks.sort((a, b) => a.description.localeCompare(b.description));
          break;
      }
    }
  
    filterTasks(filterBy) {
      const filteredTasks = this.tasks.filter(task => {
        switch (filterBy) {
          case "due_date":
            return task.dueDate === document.getElementById("due-date-filter").value;
          case "priority":
            return task.priority === document.getElementById("priority-filter").value;
          case "description":
            return task.description.toLowerCase().includes(document.getElementById("description-filter").value.toLowerCase());
        }
      });
      this.displayTaskList(filteredTasks);
    }
  
    getTask(index) {
      return this.tasks[index];
    }
  
    deleteTask(index) {
      this.tasks.splice(index, 1);
      this.displayTaskList();
    }
  
    displayTaskList(tasks = this.tasks) {
      const taskListDiv = document.getElementById("task-list");
      taskListDiv.innerHTML = "";
      tasks.forEach((task, index) => {
        const taskDiv = document.createElement("div");
        taskDiv.classList.add("task");
        taskDiv.innerHTML = `
          <input type="checkbox" id="task-${index}" ${task.completed ? "checked" : ""}>
          <label for="task-${index}" class="task-description">${task.description}</label>
          <button class="edit-button" onclick="editTask(${index})">Edit</button>
          <button class="delete-button" onclick="deleteTask(${index})">Delete</button>
        `;
        taskListDiv.appendChild(taskDiv);
      });
    }
  }
  
  const taskList = new TaskList();
  
  function addTask(event) {
    event.preventDefault();
    
    const description = document.getElementById("task-description").value;
    const dueDate = document.getElementById("due-date").value;
    const priority = document.getElementById("priority").value;
    const notes = document.getElementById("notes").value;
  
    const task = new Task(description, dueDate, priority, notes);
    taskList.addTask(task);
    taskList.displayTaskList();
  
    // Clear input fields
    document.getElementById("task-description").value = "";
    document.getElementById("due-date").value = "";
    document.getElementById("priority").value = "low";
    document.getElementById("notes").value = "";
  }
  
  function editTask(index) {
    const task = taskList.getTask(index);
  
    // Populate the form fields with task details
    document.getElementById("task-description").value = task.description;
    document.getElementById("due-date").value = task.dueDate;
    document.getElementById("priority").value = task.priority;
    document.getElementById("notes").value = task.notes;
  
    // Delete the task
    task.deleteTask();
  }
  
  function deleteTask(index) {
    taskList.deleteTask(index);
  }
  
  document.getElementById("add-task-form").addEventListener("submit", addTask);
  