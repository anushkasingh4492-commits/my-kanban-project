import { useState, useEffect } from "react";
import { io } from "socket.io-client";
import KanbanBoard from "./components/KanbanBoard";

const socket = io("http://localhost:5000");

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
    <div className="App">
      <div style={{ textAlign: "center", margin: "20px" }}>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter task..."
        />
        <button onClick={handleAddTask}>Add Task</button>
        <p>Status: {isConnected ? "🟢 Connected" : "🔴 Disconnected"}</p>
      </div>
      <KanbanBoard tasks={tasks} onMoveTask={handleMoveTask} />
    </div>
  );
}

export default App;