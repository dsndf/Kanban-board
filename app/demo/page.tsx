"use client";
import React, { useState } from "react";

const DragAndDrop: React.FC = () => {
  const [draggedItem, setDraggedItem] = useState<number | null>(null); // Type for index or null
  const [items, setItems] = useState<string[]>(["Item 1", "Item 2", "Item 3"]); // Array of strings
  const [secondBox, setSecondBox] = useState<string[]>([]);
  const onDragStart = (e: React.DragEvent<HTMLDivElement>, index: number) => {
    setDraggedItem(index); // Save the index of the item being dragged
    e.dataTransfer.setData("item", JSON.stringify({ id: index }));
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault(); // Necessary for the drop event to be triggered
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>, dropIndex: number) => {
    if (draggedItem !== null) {
      const updatedItems = [...items];
      const draggedItemContent = updatedItems.splice(draggedItem, 1)[0]; // Remove dragged item
      updatedItems.splice(dropIndex, 0, draggedItemContent); // Insert dragged item in new position
      setItems(updatedItems);
    }
  };
  const dropInBox = (e: React.DragEvent<HTMLDivElement>) => {
    console.log(e);
    console.log("text", e.dataTransfer.getData("item"));
    let item: any = e.dataTransfer.getData("item");
    item = JSON.parse(item) as { id: number };
    setSecondBox([...secondBox, items[item.id]]);
    let arr = items;
    arr.splice(item.id, 1);
    setItems(arr);
    e.dataTransfer.clearData("item");
  };

  return (
    <div>
      {items.map((item, index) => (
        <div
          key={index}
          draggable
          onDragStart={(e) => onDragStart(e, index)}
          onDragOver={(e) => onDragOver(e)}
          onDrop={(e) => onDrop(e, index)}
          style={{
            padding: "8px",
            margin: "4px",
            border: "1px solid black",
            cursor: "grab",
          }}
        >
          {item}
        </div>
      ))}
      <div
        onDrop={(e) => dropInBox(e)}
        onDragOver={(e) => onDragOver(e)}
        className="border border-red-500 p-5"
      >
        Grop here s
        {secondBox.map((v) => {
          return <div key={v}>{v}</div>;
        })}
      </div>
    </div>
  );
};

export default DragAndDrop;
