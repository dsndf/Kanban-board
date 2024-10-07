"use client";
import { useState } from "react";
interface HeaderProps {
  setTodoHandler: (data: string) => void;
}

const Header = ({ setTodoHandler }: HeaderProps) => {
  const [todo, setTodo] = useState<string>("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTodo(e.target.value);
  };

  const handleAddTodo = () => {
    if (todo.trim()) {
      console.log("Todo Created:", todo);
      // Clear the input after adding the todo
      setTodoHandler(todo);
      setTodo("");
    }
  };

  return (
    <header className="bg-white shadow-md py-6 px-8 flex items-center justify-between">
      <h1 className="text-3xl font-semibold text-gray-800">Kanban Board</h1>
      <div className="flex space-x-4">
        <input
          type="text"
          value={todo}
          onChange={handleInputChange}
          placeholder="Add a new todo"
          className="w-80 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <button
          onClick={handleAddTodo}
          className="bg-blue-500 text-white font-medium px-6 py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Add Todo
        </button>
      </div>
    </header>
  );
};

export default Header;
