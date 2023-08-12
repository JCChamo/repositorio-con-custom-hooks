import { useEffect, useReducer } from 'react';
import { toDoReducer } from './toDoReducer';

export const useToDo = () => {
  const init = () => {
    return JSON.parse(localStorage.getItem('toDos')) || [];
  };

  const [toDos, dispatch] = useReducer(toDoReducer, [], init);

  useEffect(() => {
    localStorage.setItem('toDos', JSON.stringify(toDos));
  }, [toDos]);

  const handleNewToDo = (toDo) => {
    const action = {
      type: '[TODO] Add ToDo',
      payload: toDo,
    };
    dispatch(action);
  };

  const handleDeleteToDo = (id) => {
    dispatch({
      type: '[TODO] Remove ToDo',
      payload: id,
    });
  };

  const handleToggleToDo = (id) => {
    dispatch({
      type: '[TODO] Toggle ToDo',
      payload: id,
    });
  };

  return {
    toDos,
    toDosCount: toDos.length,
    pendingToDosCount: toDos.filter((toDo) => !toDo.done).length,
    handleNewToDo,
    handleDeleteToDo,
    handleToggleToDo,
  };
};
