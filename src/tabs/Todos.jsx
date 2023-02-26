import { Button } from 'components';
import { Grid, GridItem, SearchForm, Todo } from 'components';
import todosJson from '../data/todos.json';
import { Modal } from '../components/Modal/Modal';
import { useCallback, useEffect, useMemo, useState } from 'react';

const firstTodo = todosJson[0];

export const Todos = () => {
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) ?? todosJson
  );
  const [isShow, setIsShow] = useState(false);

  useEffect(
    () => localStorage.setItem('todos', JSON.stringify(todos)),
    [todos]
  );

  const handleChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleDeleteTodo = useCallback(todoId => {
    return () => {
      setTodos(prevTodos => prevTodos.filter(el => el.id !== todoId));
    };
  }, []);

  const handleAddTodo = () => {
    const newTodo = { ...firstTodo, id: Date.now() };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const filteredTodos = useMemo(() => {
    return todos.filter(({ todo }) =>
      todo.toLowerCase().includes(search.toLowerCase().trim())
    );
  }, [todos, search]);

  const toggleModal = useCallback(() => {
    setIsShow(prevIsShow => !prevIsShow);
  }, []);

  const getCompletedTask = useMemo(() => {
    // console.log('getCompletedTask');
    return filteredTodos.reduce((calc, el) => {
      if (el.completed) {
        // console.log(el);
        calc += 1;
      }
      return calc;
    }, 0);
  }, [filteredTodos]);

  // console.log(search);
  return (
    <>
      {isShow && <Modal onClose={toggleModal} />}
      <SearchForm search={search} onChangeSearch={handleChange} />
      {/* <Button type="button">Filter</Button> */}
      <p>Completed {getCompletedTask}</p>
      <Grid>
        {filteredTodos.map(({ id, todo }) => (
          <GridItem key={id}>
            <Todo
              todo={todo}
              id={id}
              // newObj={{ cat: 'dog' }}
              onDelete={handleDeleteTodo}
              onShow={toggleModal}
            />
          </GridItem>
        ))}

        <GridItem>
          <Button type="button" onClick={handleAddTodo}>
            Add todo
          </Button>
        </GridItem>
      </Grid>
    </>
  );
};
