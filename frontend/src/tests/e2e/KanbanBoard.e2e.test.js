import React, { useState, useEffect } from 'react';
import axios from 'axios';

// THIS IS THE KEY: We are pointing to your LIVE Render backend, not localhost
const API_URL = "https://my-kanban-project.onrender.com";

const KanbanBoard = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  // 1. Load tasks from the live database when the page opens
  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${API_URL}/tasks`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  // 2. Save a new task to the live database
  const addTask = async () => {
    if (!newTask.trim()) return;
    try {
      const response = await axios.post(`${API_URL}/tasks`, { 
        title: newTask, 
        status: 'Todo' 
      });
      setTasks([...tasks, response.data]);
      setNewTask('');
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  // 3. Move a task (Update status)
  const moveTask = async (id, newStatus) => {
    try {
      await axios.put(`${API_URL}/tasks/${id}`, { status: newStatus });
      fetchTasks(); // Refresh list from database
    } catch (error) {
      console.error("Error moving task:", error);
    }
  };

  return (
    <div className="kanban-container">
      <div className="input-section">
        <input 
          value={newTask} 
          onChange={(e) => setNewTask(e.target.value)} 
          placeholder="What needs to be done?" 
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      
      <div className="board">
        {['Todo', 'In-Progress', 'Done'].map(status => (
          <div key={status} className="column">
            <h3>{status}</h3>
            {tasks.filter(t => t.status === status).map(task => (
              <div key={task._id} className="task-card">
                {task.title}
                {status !== 'Done' && (
                  <button onClick={() => moveTask(task._id, status === 'Todo' ? 'In-Progress' : 'Done')}>
                    →
                  </button>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;