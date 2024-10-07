import React, { useState } from "react";

interface CardProps {
  title: string;
  status: "todo" | "in-progress" | "complete";
  id: string;
  onDragStart: (e: React.DragEvent<HTMLDivElement>) => void;
  onDragOver: (e: React.DragEvent<HTMLDivElement>) => void;
  onDrop: (e: React.DragEvent<HTMLDivElement>) => void;
  saveHandler: (data: string) => void;
  deleteHandler: () => void;
}

const Card: React.FC<CardProps> = ({
  title,
  id,
  status,
  onDragOver,
  onDragStart,
  onDrop,
  saveHandler,
  deleteHandler,
}) => {
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [editedTitle, setEditedTitle] = useState<string>(title);

  // Determine the color based on the task status
  const getStatusColor = () => {
    switch (status) {
      case "todo":
        return "bg-gray-200 text-gray-700";
      case "in-progress":
        return "bg-yellow-200 text-yellow-800";
      case "complete":
        return "bg-green-200 text-green-800";
      default:
        return "bg-gray-200 text-gray-700";
    }
  };

  // Toggle edit mode
  const handleEditClick = () => {
    if (!isEditing) setIsEditing(!isEditing);
    else {
      saveHandler(editedTitle);
      setIsEditing(!isEditing);
    }
  };

  // Handle title input change
  const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEditedTitle(e.target.value);
  };

  return (
    <div
      className="bg-white p-4 rounded-lg shadow-md flex flex-col space-y-4 w-full max-w-md mx-auto md:max-w-full md:flex-row justify-between items-center"
      draggable
      onDragStart={onDragStart}
      onDrop={onDrop}
      onDragOver={onDragOver}
    >
      <div className="flex flex-col md:flex-row items-center space-y-2 md:space-y-0 md:space-x-4 w-full">
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor()}`}
        >
          {status === "todo"
            ? "To Do"
            : status === "in-progress"
            ? "In Progress"
            : "Complete"}
        </span>
        <div className="flex-grow">
          {isEditing ? (
            <input
              type="text"
              value={editedTitle}
              onChange={handleTitleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          ) : (
            <p className="text-gray-900 font-medium break-all">{editedTitle}</p>
          )}
        </div>
      </div>

      <div className="flex space-x-4 mt-4 md:mt-0">
        <button
          onClick={handleEditClick}
          className="text-blue-500 hover:text-blue-600 font-medium transition duration-300"
        >
          {isEditing ? "Save" : "Edit"}
        </button>

        <button
          onClick={() => deleteHandler()}
          className="text-red-500 hover:text-red-600 font-medium transition duration-300"
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default Card;
