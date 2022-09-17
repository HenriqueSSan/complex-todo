import { useState } from 'react';
import CloseIcon from '@assets/images/icon-cross.svg';
import CheckedIcon from '@assets/images/icon-check.svg';
import './app.component.style.scss';

interface ItemProps {
  title: string;
  index: any;
  todo: any;
  handleDeletedTodo: (index: any) => any;
  handleCompltedTodo: (index: any, todo: any) => void;
}

export function Item({ title, index, todo, handleCompltedTodo, handleDeletedTodo }: ItemProps) {
  return (
    <div className="todo-item box-between background-primary padding-item">
      <div className="box-center space-1">
        <div
          onClick={() => handleCompltedTodo(index, todo)}
          className={`box-center ${todo.completed ? 'is-' : ''}check circle-outline`}
        >
          <img
            className={`${todo.completed ? 'is-visible' : 'is-hidden'}`}
            src={CheckedIcon}
            alt=""
          />
        </div>
        <span className={`text-white ${todo.completed ? 'mark-text' : ''}`}>{title}</span>
      </div>
      <div
        className="box-center button"
        onClick={() => {
          console.log(todo);
          handleDeletedTodo(index);
        }}
      >
        <img src={CloseIcon} alt="" />
      </div>
    </div>
  );
}
