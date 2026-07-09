import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");

    if (savedTasks) {
        return JSON.parse(savedTasks);
    }

    return [];
  });

  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

    function handleSubmit(event) {
        event.preventDefault();

        if (taskInput.trim() === "") {
            return;
        }

        const newTask = {
            id: Date.now(),
            text: taskInput.trim(),
            completed: false
        };

        setTasks((prevTasks) => [...prevTasks, newTask]);
        setTaskInput("");
    }

    function toggleTask(id) {
        const updatedTasks = tasks.map((task) => {
            if (task.id === id) {
                return {
                    ...task,
                    completed: !task.completed
                };
            }

            return task;
        });

        setTasks(updatedTasks);
    }

    function deleteTask(id) {
        const remainingTasks = tasks.filter((task) => task.id !== id);
        setTasks(remainingTasks);
    }

    const completedTasks = tasks.filter((task) => task.completed).length;
    const filteredTasks = tasks.filter((task) => {
      if (filter === "active") {
          return !task.completed;
      }

      if (filter === "completed") {
          return task.completed;
      }

      return true;
    });

    return (
        <main className="app">
            <section className="task-card">
                <div className="header">
                    <p className="eyebrow">React Project</p>
                    <h1>Task Manager</h1>
                    <p className="subtitle">
                        Add and manage your daily development tasks.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="task-form">
                    <input
                        type="text"
                        placeholder="What do you want to work on?"
                        value={taskInput}
                        onChange={(event) => setTaskInput(event.target.value)}
                    />

                    <button type="submit">Add Task</button>
                </form>

                <div className="task-summary">
                    <span>Total tasks: {tasks.length}</span>
                    <span>Completed: {completedTasks}</span>
                </div>

                <div className="filter-buttons">
                  <button
                      className={filter === "all" ? "active-filter" : ""}
                      onClick={() => setFilter("all")}
                  >
                      All
                  </button>

                  <button
                      className={filter === "active" ? "active-filter" : ""}
                      onClick={() => setFilter("active")}
                  >
                      Active
                  </button>

                  <button
                      className={filter === "completed" ? "active-filter" : ""}
                      onClick={() => setFilter("completed")}
                  >
                      Completed
                  </button>
                </div>

                <ul className="task-list">
                    {filteredTasks.length === 0 ? (
                        <li className="empty-state">
                            No tasks yet. Add your first task above.
                        </li>
                    ) : (
                        filteredTasks.map((task) => (
                            <li
                                className={task.completed ? "task-item completed-task" : "task-item"}
                                key={task.id}
                            >
                                <span>{task.text}</span>

                                <div className="task-actions">
                                    <button
                                        className="complete-btn"
                                        onClick={() => toggleTask(task.id)}
                                    >
                                        {task.completed ? "Undo" : "Done"}
                                    </button>

                                    <button
                                        className="delete-btn"
                                        onClick={() => deleteTask(task.id)}
                                    >
                                        Delete
                                    </button>
                                </div>
                            </li>
                        ))
                    )}
                </ul>
            </section>
        </main>
    );
}

export default App;