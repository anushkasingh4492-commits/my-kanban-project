import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest"; // This is the missing line
import KanbanBoard from "../../components/KanbanBoard";

test("renders Kanban board title", () => {
  render(<KanbanBoard tasks={[]} />);
  const linkElement = screen.getByText(/Kanban Board/i);
  expect(linkElement).toBeDefined();
});