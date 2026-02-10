import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import KanbanBoard from "./components/KanbanBoard";

const socket = io("https://my-kanban-project.onrender.com");
const theme = {
  background: '#FFF9F0', // Light cream pastel
  header: '#FFD1DC',     // Pastel pink
  card: '#FFFFFF',
  font: "'Quicksand', sans-serif"
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState("");
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("taskUpdated", (updatedTasks) => setTasks(updatedTasks));

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("taskUpdated");
    };
  }, []);

  const handleAddTask = () => {
    if (!input.trim()) return;
    const newTask = { id: Date.now(), text: input, status: "Todo" };
    const newTasks = [...tasks, newTask];
    setTasks(newTasks);
    socket.emit("updateTask", newTasks); // FIXED: Changed from .emil to .emit
    setInput("");
  };

  const handleMoveTask = (id, newStatus) => {
    const newTasks = tasks.map((task) =>
      task.id === id ? { ...task, status: newStatus } : task
    );
    setTasks(newTasks);
    socket.emit("updateTask", newTasks); // Broadcast move to other clients
  };

  return (
    <div style={{ 
      backgroundColor: '#fdfcf0', // Pastel Cream Background
      minHeight: '100vh', 
      fontFamily: "'Quicksand', sans-serif", 
      padding: '40px 20px',
      color: '#444'
    }}>
      <header style={{ 
        textAlign: 'center', 
        marginBottom: '40px' 
      }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          color: '#b8c0ff', // Pastel Purple Title
          marginBottom: '20px',
          textShadow: '2px 2px 4px rgba(0,0,0,0.05)'
        }}>
          🌸🌸 My Kanban Board.
        </h1>
        
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)}
            placeholder="What needs to be done?"
            style={{ 
              padding: '12px 20px', 
              borderRadius: '25px', 
              border: '2px solid #fff', 
              width: '300px',
              outline: 'none',
              boxShadow: '0 4px 10px rgba(0,0,0,0.05)',
              fontSize: '1rem'
            }}
          />
          <button 
            onClick={handleAddTask} 
            style={{ 
              padding: '12px 25px', 
              borderRadius: '25px', 
              border: 'none', 
              backgroundColor: '#ffcfd2', // Pastel Pink Button
              color: '#555',
              fontWeight: 'bold',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'scale(1.05)'}
            onMouseOut={(e) => e.target.style.transform = 'scale(1)'}
          >
            Add Task
          </button>
        </div>
      </header>

      {/* This renders your KanbanBoard component with the tasks */}
      <div style={{ display: 'flex', justifyContent: 'center' }}>
        <KanbanBoard tasks={tasks} onMoveTask={handleMoveTask} />
      </div>
    </div>
  );
}

export default App;