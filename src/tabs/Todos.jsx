import { nanoid } from 'nanoid';
import { Button } from 'components';
import { Grid, GridItem, SearchForm, EditForm, Text, Todo } from 'components';
import todosJson from '../data/todos.json';
import { Modal } from '../components/Modal/Modal';
import { useEffect, useState } from 'react';

const firstTodo = todosJson[0];

// const a = { test: 'test', id: 1 };
// const b = { ...a, id: 323 };
// const c = [2, 3, 34];
// const d = [43, 435, ...c];

export const Todos = () => {
  const [search, setSearch] = useState('');
  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) ?? todosJson
  );
  const [isFilterd, setIsFiltred] = useState(false);
  const [isShow, setIsShow] = useState(false);

  useEffect(
    () => localStorage.setItem('todos', JSON.stringify(todos)),
    [todos]
  );

  const handleChange = event => {
    const { value } = event.target;
    setSearch(value);
  };

  const handleDeleteTodo = todoId => {
    return () => {
      setTodos(prevTodos => prevTodos.filter(el => el.id !== todoId));
    };
  };

  const handleAddTodo = () => {
    const newTodo = { ...firstTodo, id: Date.now() };
    setTodos(prevTodos => [newTodo, ...prevTodos]);
  };

  const applySearch = () => {
    return todos.filter(({ todo }) =>
      todo.toLowerCase().includes(search.toLowerCase().trim())
    );
  };

  //  applyFilterTodo = () => {
  //     if (this.state.isFilterd) {
  //       const filtersdTodos = this.state.todos.filter(el => el.completed);
  //       return filtersdTodos;
  //     }
  //     return this.state.todos;
  //   };
  //   handleFilterTodo = () => {
  //     this.setState(prev => ({ isFilterd: !prev.isFilterd }));
  //   };

  // componentDidMount() {
  //   const localStorageData = JSON.parse(localStorage.getItem('todos'));

  //   if (localStorageData) {
  //     this.setState({ todos: localStorageData });
  //   }
  // }

  // componentDidUpdate(prevProps, prevState) {
  //   if (prevState.todos !== this.state.todos) {
  //     localStorage.setItem('todos', JSON.stringify(this.state.todos));
  //   }
  // }

  const toggleModal = () => {
    setIsShow(prevIsShow => !prevIsShow);
  };

  // console.log(search);
  return (
    <>
      {isShow && <Modal onClose={toggleModal} />}
      <SearchForm search={search} onChangeSearch={handleChange} />
      <Button type="button">Filter</Button>
      <Grid>
        {applySearch().map(({ id, todo }) => (
          <GridItem key={id}>
            <Todo
              todo={todo}
              id={id}
              newObj={{ cat: 'dog' }}
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
