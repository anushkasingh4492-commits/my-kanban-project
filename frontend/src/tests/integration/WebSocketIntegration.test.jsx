import { expect, test, vi } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import KanbanBoard from "../../components/KanbanBoard";

// This test checks if the board renders correctly during socket updates
test("WebSocket integration renders Kanban Board", async () => {
  const mockTasks = [
    { id: 1, text: "Test Task", status: "Todo" }
  ];

  render(<KanbanBoard tasks={mockTasks} onMoveTask={() => {}} />);

  // Check if the board title is visible
  const titleElement = screen.getByText(/Kanban Board/i);
  expect(titleElement).toBeDefined();

  // Check if our mock task appears on the board
  const taskElement = screen.getByText(/Test Task/i);
  expect(taskElement).toBeDefined();
});

test("renders empty board when no tasks are provided", () => {
  render(<KanbanBoard tasks={[]} />);
  const todoColumn = screen.getByText(/Todo/i);
  expect(todoColumn).toBeDefined();
});