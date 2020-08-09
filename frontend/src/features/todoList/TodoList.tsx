import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  add,
  remove,
  update,
  fetchTodos,
  selectTodos,
} from './todoListSlice';
import styles from './TodoList.module.css';
import { Task } from './Task';
import { Todo } from '../../types/todo';

export function TodoList() {
  const dispatch = useDispatch();
  const todos = useSelector(selectTodos);
  const [description, setDescription] = useState('My todo!');


  useEffect(() => {
    dispatch(fetchTodos());
  }, [])

  return (
    <div>
      <ul>
        {todos.map(t => <Task key={t.id} todo={t}/>)}
      </ul>
      <div className={styles.row}>
        <input type="text"
          onChange={e => setDescription(e.target.value)}
          value={description}></input>
        <button onClick={() => dispatch(add({
          description,
          completed: false
        }))}>➕</button>
      </div>



      {/* <div className={styles.row}>
        <button
          className={styles.button}
          aria-label="Increment value"
          onClick={() => dispatch(increment())}
        >
          +
        </button>
        <span className={styles.value}>{count}</span>
        <button
          className={styles.button}
          aria-label="Decrement value"
          onClick={() => dispatch(decrement())}
        >
          -
        </button>
      </div>
      <div className={styles.row}>
        <input
          className={styles.textbox}
          aria-label="Set increment amount"
          value={incrementAmount}
          onChange={e => setIncrementAmount(e.target.value)}
        />
        <button
          className={styles.button}
          onClick={() =>
            dispatch(incrementByAmount(Number(incrementAmount) || 0))
          }
        >
          Add Amount
        </button>
        <button
          className={styles.asyncButton}
          onClick={() => dispatch(incrementAsync(Number(incrementAmount) || 0))}
        >
          Add Async
        </button>
      </div> */}
    </div>
  );
}
