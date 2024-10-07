"use client";
import React, { useEffect, useState } from "react";
import Header from "./_components/header";
import Column from "./_components/column";
import { v4 as uuidv4 } from "uuid";
import Card from "./_components/card";
import { Item, Status } from "@/types/types";
import { getData, storeData } from "@/lib/helper";

const page = () => {
  const [todos, setTodos] = useState<Item[]>(getData("todo"));
  const [completes, setCompletes] = useState<Item[]>(getData("complete"));
  const [progresses, setProgresses] = useState<Item[]>(getData("in-progress"));
  const [draggedCard, setDraggedCard] = useState<number | null>(null);

  const setTodoHandler = (data: string) => {
    const id = uuidv4();
    setTodos((prev) => [...prev, { id, title: data, status: "todo" }]);
  };
  const editHandler = (id: string, status: Status, data: string) => {
    if (status === "todo") {
      setTodos((prev) =>
        prev.map((todo) => {
          if (todo.id === id) todo.title = data;
          return todo;
        })
      );
    } else if (status === "in-progress") {
      setProgresses((prev) =>
        prev.map((progress) => {
          if (progress.id === id) progress.title = data;
          return progress;
        })
      );
    } else {
      setCompletes((prev) =>
        prev.map((complete) => {
          if (complete.id === id) complete.title = data;
          return complete;
        })
      );
    }
  };

  const deleteHandler = (id: string, status: Status) => {
    if (status === "todo") {
      setTodos((prev) =>
        prev.filter((todo) => {
          return todo.id !== id;
        })
      );
    } else if (status === "in-progress") {
      setProgresses((prev) =>
        prev.filter((progress) => {
          return progress.id !== id;
        })
      );
    } else {
      setCompletes((prev) =>
        prev.filter((complete) => {
          return complete.id !== id;
        })
      );
    }
  };

  const onDragStart = (
    e: React.DragEvent<HTMLDivElement>,
    index: number,
    status: Status
  ) => {
    setDraggedCard(index); // Save the index of the item being dragged
    if (status === "todo") {
      const data = todos[index];
      e.dataTransfer.setData("card", JSON.stringify(data));
    } else if (status === "in-progress") {
      const data = progresses[index];
      e.dataTransfer.setData("card", JSON.stringify(data));
    } else {
      const data = completes[index];
      e.dataTransfer.setData("card", JSON.stringify(data));
    }
  };

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const addDroppedCardInColumn = (list: Item[], dropIndex: number) => {
    if (draggedCard === null) return list;
    const updatedItems = [...list];
    const draggedItemContent = updatedItems.splice(draggedCard, 1)[0];

    updatedItems.splice(dropIndex, 0, draggedItemContent);
    console.log({ updatedItems });
    return updatedItems;
  };

  const onDrop = (
    e: React.DragEvent<HTMLDivElement>,
    dropIndex: number,
    status: Status
  ) => {
    if (draggedCard !== null) {
      if (status === "todo") {
        alert(addDroppedCardInColumn(todos, dropIndex)[0].title);
        setTodos(addDroppedCardInColumn(todos, dropIndex));
      } else if (status === "in-progress") {
        setProgresses(addDroppedCardInColumn(progresses, dropIndex));
      }
      if (status === "complete") {
        setCompletes(addDroppedCardInColumn(completes, dropIndex));
      }
    }
    setDraggedCard(null);
  };
  const dropInColumn = (e: React.DragEvent<HTMLDivElement>, status: Status) => {
    const data = JSON.parse(e.dataTransfer.getData("card")) as Item;
    if (data.status === "todo")
      setTodos((prev) => prev.filter((todo) => todo.id !== data.id));
    else if (data.status === "in-progress")
      setProgresses((prev) =>
        prev.filter((progress) => progress.id !== data.id)
      );
    else {
      setCompletes((prev) =>
        prev.filter((complete) => complete.id !== data.id)
      );
    }
    e.dataTransfer.clearData("card");
    if (status === "in-progress") {
      setProgresses((prev) => [...prev, { ...data, status }]);
    } else if (status === "todo") {
      setTodos((prev) => [...prev, { ...data, status }]);
    } else {
      setCompletes((prev) => [...prev, { ...data, status }]);
    }
  };

  useEffect(() => {
    storeData("todo", todos);
    storeData("in-progress", progresses);
    storeData("complete", completes);
  }, [todos, progresses, completes]);

  return (
    <div>
      <Header setTodoHandler={setTodoHandler} />
      <div className="flex justify-between p-6 gap-2">
        <Column title="Todo" onDrop={(e) => dropInColumn(e, "todo")}>
          {todos &&
            todos.map((todo, index) => (
              <Card
                key={todo.id}
                id={todo.id}
                title={todo.title}
                status={todo.status}
                onDragStart={(e) => onDragStart(e, index, todo.status)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, index, todo.status)}
                saveHandler={(data) => editHandler(todo.id, todo.status, data)}
                deleteHandler={() => deleteHandler(todo.id, todo.status)}
              />
            ))}
        </Column>
        <Column title="Progress" onDrop={(e) => dropInColumn(e, "in-progress")}>
          {progresses &&
            progresses.map((progress, index) => (
              <Card
                key={progress.id}
                id={progress.id}
                title={progress.title}
                status={progress.status}
                onDragStart={(e) => onDragStart(e, index, progress.status)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, index, progress.status)}
                saveHandler={(data) =>
                  editHandler(progress.id, progress.status, data)
                }
                deleteHandler={() =>
                  deleteHandler(progress.id, progress.status)
                }
              />
            ))}
        </Column>
        <Column title="Complete" onDrop={(e) => dropInColumn(e, "complete")}>
          {completes &&
            completes.map((complete, index) => (
              <Card
                key={complete.id}
                id={complete.id}
                title={complete.title}
                status={complete.status}
                onDragStart={(e) => onDragStart(e, index, complete.status)}
                onDragOver={(e) => onDragOver(e)}
                onDrop={(e) => onDrop(e, index, complete.status)}
                saveHandler={(data) =>
                  editHandler(complete.id, complete.status, data)
                }
                deleteHandler={() =>
                  deleteHandler(complete.id, complete.status)
                }
              />
            ))}
        </Column>
      </div>
    </div>
  );
};

export default page;
