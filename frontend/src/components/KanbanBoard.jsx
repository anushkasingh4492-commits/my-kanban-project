import React from 'react';
const KanbanBoard = ({ tasks = [], onMoveTask }) => {

  const columns = ['Todo', 'In-Progress', 'Done'];

  return (
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center' }}>Kanban Board</h2>
      <div style={{ display: 'flex', justifyContent: 'space-around', gap: '10px' }}>
        {columns.map((column) => (
          <div 
            key={column} 
            style={{ border: '1px solid #ccc', borderRadius: '8px', width: '30%', minHeight: '400px', padding: '10px', backgroundColor: '#f9f9f9' }}
          >
            <h3 style={{ textAlign: 'center', borderBottom: '1px solid #ddd' }}>{column}</h3>
            {tasks.filter(t => t.status === column).map((task) => (
              <div 
                key={task.id} 
                style={{ padding: '10px', margin: '10px 0', backgroundColor: 'white', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 2px 4px rgba(0,0,0,0.05)' }}
              >
                <p>{task.text}</p>
                <div style={{ display: 'flex', gap: '5px' }}>
                  {column !== 'Todo' && <button onClick={() => onMoveTask(task.id, columns[columns.indexOf(column) - 1])}>⬅️</button>}
                  {column !== 'Done' && <button onClick={() => onMoveTask(task.id, columns[columns.indexOf(column) + 1])}>➡️</button>}
                </div>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KanbanBoard;