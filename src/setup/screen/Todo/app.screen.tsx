import { useState } from 'react';
import produce from 'immer';
import { Item } from '@modules/components/Item/app.component';
import CheckedIcon from '@assets/images/icon-check.svg';
import MoonImg from '@assets/images/icon-moon.svg';
import SunImg from '@assets/images/icon-sun.svg';

import './app.screen.style.scss';

interface ITodosObjects {
  title: string;
  completed: boolean;
}

export function Todo() {
  const [todos, set_todos] = useState<ITodosObjects[]>([]);
  const [newTodo, set_newTodo] = useState('');
  const [theme, setTheme] = useState('dark-theme');
  const [typeFilterTodo, set_typeFilterTodo] = useState('all');
  const [completedTodo, set_completedTodo] = useState(false);

  function handleAddTodo() {
    set_todos([...todos, { title: newTodo, completed: completedTodo }]);
  }

  function handleCompletTodo() {
    set_completedTodo(!completedTodo);
  }

  function handleCompltedTodo(index: any, todo: ITodosObjects) {
    set_todos(
      produce(todos, (draft) => {
        draft.forEach((_) => (draft[index].completed = !todo.completed));
      })
    );
  }

  function handleDeletedTodo(index: any) {
    set_todos(
      produce(todos, (draft) => {
        draft.splice(index, 1);
      })
    );
  }

  function toggleTheme() {
    const body = document.getElementsByTagName('body')[0];

    if (theme === 'dark-theme') {
      body.classList.add('light-theme');
      setTheme('light-theme');
    } else {
      body.classList.remove('light-theme');
      setTheme('dark-theme');
    }
  }

  function handlefilterTodos(items: any, type: string) {
    if (type == 'completed') {
      return items.filter((item: any) => (item.completed ? item : null));
    } else if (type === 'active') {
      return items.filter((item: any) => (item.completed === false ? item : null));
    } else {
      return items;
    }
  }

  function clearAllTodosCompleted() {
    set_todos(
      produce(todos, (draft) => {
        for (let i = 0; i < 10; i++) {
          draft.filter((todo, index) => (todo.completed ? draft.splice(index, 1) : todos[index]));
        }
      })
    );
  }

  return (
    <section>
      <div className="container-top">
        <header>
          <div className="background-header background-fullwidth"></div>
        </header>
      </div>

      <div className="todo">
        <div className="todo-container flow-space">
          <header className="box-between box-transparent">
            <h2 className="title text-white">Todo</h2>
            <button className="button" type="button" onClick={toggleTheme} data-type="text">
              <img src={theme === 'light-theme' ? MoonImg : SunImg} alt="" />
            </button>
          </header>

          <div className="todo-input flow box-start background-primary padding-input space-1">
            <div
              className={`box-center ${completedTodo ? 'is-' : ''}check circle-outline`}
              onClick={handleCompletTodo}
            >
              <img
                className={`${completedTodo ? 'is-visible' : 'is-hidden'}`}
                src={CheckedIcon}
                alt=""
              />
            </div>
            <input
              value={newTodo}
              type="text"
              onKeyUp={(e) => (e.key === 'Enter' ? handleAddTodo() : null)}
              onChange={(e) => set_newTodo(e.target.value)}
              className="input input-fullwidth input-transparent text-white input-padding-1"
            />
          </div>

          <div className="todo-items flow">
            <ul className="overflow-auto">
              {handlefilterTodos(todos, typeFilterTodo).map((todo: any, index: any) => (
                <Item
                  todo={todo}
                  index={index}
                  handleDeletedTodo={handleDeletedTodo}
                  handleCompltedTodo={handleCompltedTodo}
                  key={index}
                  title={todo.title}
                />
              ))}
            </ul>
          </div>
          <div className="todos-filter box-between background-primary">
            <div>
              <p className="text-white">{handlefilterTodos(todos, 'All').length} items left</p>
            </div>
            <div className="box-center space-1">
              <button
                className={`button padding-button-1 text-white ${
                  typeFilterTodo === 'all' ? 'text-active' : ''
                }`}
                data-type="text"
                onClick={() => {
                  set_typeFilterTodo('all');
                }}
              >
                All
              </button>
              <button
                className={`button padding-button-1 text-white ${
                  typeFilterTodo === 'active' ? 'text-active' : ''
                }`}
                data-type="text"
                onClick={() => {
                  set_typeFilterTodo('active');
                }}
              >
                Active
              </button>
              <button
                className={`button padding-button-1 text-white ${
                  typeFilterTodo === 'completed' ? 'text-active' : ''
                }`}
                data-type="text"
                onClick={() => {
                  set_typeFilterTodo('completed');
                }}
              >
                Completed
              </button>
            </div>
            <div>
              <button
                className={`button padding-button-1 text-white`}
                data-type="text"
                onClick={clearAllTodosCompleted}
              >
                Clear Completed
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
