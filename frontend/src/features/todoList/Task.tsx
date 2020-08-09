import { Todo } from "../../types/todo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { update, remove } from "./todoListSlice";

type Props = {
  todo: Todo;
};

export function Task({ todo }: Props) {
  const [description, setDescription] = useState(todo.description);
  const [completed, setCompleted] = useState(todo.completed);
  const dispatch = useDispatch();
  const updateTodo = () => dispatch(update({
    id: todo.id,
    description,
    completed
  }));

  return (
    <div>
      <input type="text"
        onChange={e => setDescription(e.target.value)}
        value={description}></input>

      <input type="checkbox"
        onChange={e => setCompleted(e.target.checked)}
        checked={completed}></input>
      
      <button onClick={updateTodo}>✔</button>
      <button onClick={() => dispatch(remove(todo.id))}>✖</button>
    </div>
  )
}